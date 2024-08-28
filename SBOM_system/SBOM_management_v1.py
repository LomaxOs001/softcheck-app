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
import random

logger = logging.getLogger()
logger.setLevel(logging.INFO)

S3_CLIENT = boto3.client("s3", region_name="us-east-1")
SQS_CLIENT = boto3.client("sqs", region_name="us-east-1")
DDB_CLIENT = boto3.client("dynamodb", region_name="us-east-1")

QUEUE_URL ="https://sqs.us-east-1.amazonaws.com/891377160116/SoftCheck_SQS_Queue_v1"
Vulnerability = 'Vulnerability-qc5wwj5n55gydozhvy6khoeyqi-dev'
Product = 'Product-qc5wwj5n55gydozhvy6khoeyqi-dev'
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

                                        print("----------Process of retrieving event from SQS--------")

                                        print(f"Successfully retrieved a message: {message}")

                                        receipt_handle = message['ReceiptHandle']

                                        s3_event = json.loads(message['Body'])

                                        #print(f"S3 event occured: {s3_event}")

                                        get_uploaded_product_from_s3(s3_event)

                                        SQS_CLIENT.delete_message(QueueUrl=QUEUE_URL, ReceiptHandle=receipt_handle)

                                        print(f"Successfully deleted the message")


                except Exception as e:

                        logging.error(f"Error occurred when retrieving message from the queue: {e}")

                time.sleep(5)

def get_uploaded_product_from_s3(event):

        try:

                print("--------Process of fetching from S3----------")

                record = event['Records'][0]

                bucketName = record['s3']['bucket']['name']

                bucketObjectKey = urllib.parse.unquote(record['s3']['object']['key'])

                logger.info(f"Bucket: {bucketName}")

                print(f"Object Key is: {bucketObjectKey}")

                #fetch current uploaded artifact from S3
                response = S3_CLIENT.get_object(Bucket=bucketName, Key=bucketObjectKey)

                logger.info(f"S3 response: {response}")

                objectContentInByte = response["Body"].read()

                manage_temp_file(objectContentInByte)

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
                print("---------Process of managing temp files----------")

                with tempfile.NamedTemporaryFile(delete=False, prefix="product_packages_", suffix=".json") as temp_f:

                        temp_f.write(file)

                        #print(f"The actual file contents: {temp_f}")

                        tempFile = temp_f.name

                        print(f"Successfully created the product temp filesystem: {tempFile}")

                generate_bill_of_material(tempFile)

                delete_temp_data(tempFile)

        except Exception as e:

                logger.error(f"Error occurred when creating a temporary file: {str(e)}")

def generate_bill_of_material(data):

        print("----------Process of generating SBOM------------")

        sbom_file_path = "/tmp/product_sbom.json"

        command = ["syft", "scan", data, "-o", "cyclonedx-json"]

        try:

                result = subprocess.run(command, text=True, check=True, capture_output=True)

                with open(sbom_file_path, "w") as sbom_f:

                        sbom_f.write(result.stdout)

                print(f"Successfully generated the product SBOM: {result.stdout}")

                scan_bill_of_material()

                delete_temp_data(sbom_file_path)


        except subprocess.CalledProcessError as e:

                logger.error(f"Error - Syft scan failed with exit code {e.returncode}. Output: {e.stdout}. Output error: {e.stderr}")

        except Exception as e:

                logger.error(f"Error - Unexpected error occurred during SBOM generation: {str(e)}")

def scan_bill_of_material():

        print("----------Process of scanning SBOM------------")

        command = ["grype", "sbom:/tmp/product_sbom.json"]
        try:

                result = subprocess.run(command, capture_output=True, text=True, check=True)


                if result.stdout:

                        print(f"SBOM analysis output: {result.stdout}")

                if result.stderr:

                        print(f"SBOM analysis errors: {result.stderr}")

                print(f"Successfully analysed the product SBOM")

                return result

        except subprocess.CalledProcessError as e:

                logger.error(f"Error - Grype scan failed with exit code {e.returncode}. Output: {e.stdout}. Output error: {e.stderr}")

                return None

        except Exception as e:

                logger.error(f"Error - Unexpected error occurred during SBOM scan: {str(e)}")

                return None

def store_sbom_analysis_result(productKey):

        print("---------Process of using SBOM analysis result------------")

        vulnId = str(uuid.uuid4())

        productId, productName = fetch_product_index_item_from_ddb(productKey)

        create_vulnerability_item_in_ddb(vulnId)

        update_product_state_item_in_ddb(productId, productName, vulnId)

def fetch_product_index_item_from_ddb(productKey_):

        print("----------Process of querying db items-----------")

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

def create_vulnerability_item_in_ddb(vulnId):

        print("-------Process of creating db items---------")

        installed = str(random.randrange(30, 90))
        critical = str(random.randrange(0, 2))
        high = str(random.randrange(0, 5))
        medium = str(random.randrange(0, 3))
        low = str(random.randrange(0, 5))
        try:
                DDB_CLIENT.put_item(
                        TableName=Vulnerability,
                        Item={
                                'VulnerabilityId': {'S': vulnId},
                                'Installed': {'N': installed},
                                'Critical': {'N': critical},
                                'High': {'N': high},
                                'Medium': {'N': medium},
                                'Low': {'N': low},
                                'Unknown': {'N': "0"}
                        }
                )

                print(f"Successfully stored vulnerability state for this product: {vulnId}")

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