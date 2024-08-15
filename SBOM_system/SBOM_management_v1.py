#!/usr/bin/env python3

import json
import boto3
import logging
import urllib.parse
import subprocess
import tempfile
import time
from pathlib import Path
import uuid

logger = logging.getLogger()
logger.setLevel(logging.INFO)

S3_CLIENT = boto3.client("s3", region_name="us-east-1")
SQS_CLIENT = boto3.client("sqs", region_name="us-east-1")
DDB_CLIENT = boto3.client("dynamodb", region_name="us-east-1")

QUEUE_URL ="https://sqs.us-east-1.amazonaws.com/891377160116/SoftCheck_SQS_Queue_v1"
Vulnerability = 'Vulnerability-xias2m6jprfjvgqk6ab6xuuxmm-dev'
Product = 'Product-xias2m6jprfjvgqk6ab6xuuxmm-dev'
ProductIndex = 'ProductTableIndex0101'


def process_with_product_sbom():

        get_received_message_from_sqs()


def get_received_message_from_sqs():

        while True:
                try:
                        response = SQS_CLIENT.receive_message(QueueUrl=QUEUE_URL, MaxNumberOfMessages=1, WaitTimeSeconds=5)

                        messages = response.get("Messages")

                        if messages:
                                for message in messages:

                                        print(f"Successfully retrieved a message: {message}")

                                        receipt_handle = message['ReceiptHandle']

                                        s3_event = json.loads(message['Body'])

                                        print(f"S3 event occured: {s3_event}")

                                        fetch_uploaded_product_from_s3(s3_event)

                                        SQS_CLIENT.delete_message(QueueUrl=QUEUE_URL, ReceiptHandle=receipt_handle)

                                        print(f"Successfully deleted the message")

                except Exception as e:
                        logging.error(f"Error occurred when retrieving message from the queue: {e}")

                time.sleep(5)

def fetch_uploaded_product_from_s3(event):

        try:

                record = event['Records'][0]

                bucketName = record['s3']['bucket']['name']

                bucketObjectKey = urllib.parse.unquote(record['s3']['object']['key'])

                logger.info(f"Bucket: {bucketName}")

                logger.info(f"Object Key is: {bucketObjectKey}")

                #fetch current uploaded artifact from S3
                response = S3_CLIENT.get_object(Bucket=bucketName, Key=bucketObjectKey)

                logger.info(f"S3 response: {response}")

                objectContentInByte = response["Body"].read()

                logger.info(f"Object content in Byte: {objectContentInByte}")

                objectContentInJsonString = json.loads(objectContentInByte.decode('utf-8'))

                logger.info(f"Object content in String:{objectContentInJsonString}")

                manage_temp_file(objectContentInJsonString)

                store_sbom_analysis_result(bucketObjectKey)

        except KeyError as e:
                logger.error(f"Error occurred when extracting bucket and object key from event: {str(e)}")

        except S3_CLIENT.exceptions.NoSuchKey:
                logger.error(f"Error occurred when calling the GetObject operation: The key {bucketObjectKey} is not found")

        except UnicodeDecodeError:
                logger.error("Error occurred when decoding byte: invalid UTF-8")

        except json.JSONDecodeError:
                logger.error("Error occurred when deserializing: invalid JSON document")
                
        except Exception as e:
                logger.error(f"Error occurred when fetching object from S3: {str(e)}")

def manage_temp_file(file):

        global tempFile
        try:

                with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as temp_f:

                        temp_f.write(json.dumps(file).encode('utf-8'))

                        tempFile = temp_f.name

                        print(f"A temporary file is created: {tempFile}")

                generate_bill_of_material(tempFile)

                delete_temp_data(tempFile)

        except Exception as e:
                logger.error(f"Error occurred when creating a temporary file: {str(e)}")

def generate_bill_of_material(data):

        try:

                result = subprocess.run(["syft", "scan", data, "-o", "cyclonedx-json"], text=True, check=True, capture_output=True)

                with open("/tmp/product_sbom.json", "w") as sbom_f:

                        sbom_f.write(result.stdout)

                print(f"Successfully generated product SBOM")

                scan_bill_of_material()

                delete_temp_data("/tmp/product_sbom.json")

        except subprocess.CalledProcessError as e:
                logger.error(f"Error - Unexpected error occurred during SBOM generate: {str(e)}")
                
def scan_bill_of_material():

        try:

                result = subprocess.run(["grype", "sbom:/tmp/product_sbom.json"], capture_output=True, text=True, check=True)

                print(f"Grype Scan Output: {result.stdout}")
                if result.stdout:
                        print(f"Grype Scan Output: {result.stdout}")

                if result.stderr:
                        print(f"Grype Scan Errors: {result.stderr}")

                print(f"Successfully scanned product SBOM")

                return result

        except subprocess.CalledProcessError as e:
                logger.error(f"Error - Grype scan failed with exit code {e.returncode}. Output: {e.stdout}. Output error: {e.stderr}")
                return None

        except Exception as e:
                logger.error(f"Error - Unexpected error occurred during SBOM scan: {str(e)}")
                return None

def store_sbom_analysis_result(productKey):

        vulnId = str(uuid.uuid4())

        productId, productName = fetch_product_index_item_from_ddb(productKey)

        analysisResult = True

        create_vulnerability_item_in_ddb(vulnId, analysisResult)

        update_product_state_item_in_ddb(productId, productName, vulnId)

def fetch_product_index_item_from_ddb(productKey_):

        try:
                response = DDB_CLIENT.query(
                                TableName= Product,
                                IndexName= ProductIndex,
                                KeyConditionExpression='ProductKey = :searchKey',
                                ExpressionAttributeValues={
                                        ':searchKey': {'S': productKey_}
                                })
                
                if 'Items' in response:

                        productId = response['Items'][0]['ProductId']['S']
                        productName = response['Items'][0]['Name']['S']

                        print(f"Product item found in DDB: {productId} - {productName}")

                        return productId, productName
                else:
                        logger.error(f"Product item not found in DDB")
                        return None, None

        except Exception as e:
                logger.error(f"Error occurred when fetching product item from DDB: {str(e)}")

        return response

def create_vulnerability_item_in_ddb(vulnId, analysisResult):


        try:
                DDB_CLIENT.put_item(
                        TableName=Vulnerability,
                        Item={
                                'VulnerabilityId': {'S': vulnId},
                                'IsVulnerable': {'BOOL': analysisResult}
                        }
                )
                
                print(f"Vulnerability item created in DDB: {vulnId}")

        except Exception as e:
                logger.error(f"Error occurred when creating vulnerability item in DDB: {str(e)}")

def update_product_state_item_in_ddb(productId, productName, vulnId):

        try:
                response = DDB_CLIENT.update_item(
                                TableName=Product,
                                Key={   'ProductId':{'S':productId},
                                        'Name': {'S': productName}},
                                UpdateExpression='set StateId = :VulnerId',
                                ExpressionAttributeValues={':VulnerId': {'S': vulnId}},
                                ReturnValues="UPDATED_NEW",
                )

                print(f"Item updated successfully: {response}")
        except Exception as e:
                logger.error(f"Error when updating table Product: {str(e)} ")
                raise
        
def delete_temp_data(temp_data):

        temp_path = Path(temp_data)

        if not temp_path.exists():
                logger.error(f"Error - The path {temp_path} does not exist")
                return

        try:
                if temp_path.is_file():
                        temp_path.unlink()
                        print(f"Successfully deleted {temp_data}")

        except OSError as e:
                logger.error(f"Error deleting a file in {temp_path}: {str(e)}")

if __name__ == "__main__":

        process_with_product_sbom()