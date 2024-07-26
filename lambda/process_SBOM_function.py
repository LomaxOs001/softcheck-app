import json
import boto3
import logging
import urllib.parse
import subprocess

logger = logging.getLogger()
logger.setLevel(logging.INFO)
S3API = boto3.client("s3", region_name="us-east-1") 

def lambda_handler(event, context):
    
    get_upload_product(event)

def get_upload_product(event):
    try:
        #Extract bucket name and object key
        record = event['Records'][0]
        bucketName = record['s3']['bucket']['name']
        bucketObjectKey = urllib.parse.unquote(record['s3']['object']['key'])
        
        logger.info(f"Bucket: {bucketName}")
        logger.info(f"Object Key: {bucketObjectKey}")
        
        #Fetch object from S3
        response = S3API.get_object(Bucket=bucketName, Key=bucketObjectKey)
        logger.info(f"S3 response: {response}")
        
        #Read product contents
        content = response["Body"].read()
        data = json.loads(content.decode('utf-8'))
        logger.info("Body: %s", json.dumps({'response': data}))
        
        
        #Generate SBOM for the product
        generate_bill_of_material(json.dumps({'response': data}))
        
        
        #Scan the generated SBOM
        result = scan_bill_of_material()
        if result is None:
            logger.error(f"Failed to scan SBOM")
            return
            
        #Send response via API
        send_response(result)
            
        
    except KeyError as e:
        logger.error(f"Error occurred when extracting bucket and object key from event: {str(e)}")
    
    except S3API.exceptions.NoSuchKey:
        logger.error(f"Error occurred when calling the GetObject operation: The key {bucketObjectKey} is not found")
        
    except UnicodeDecodeError:
        logger.error("Error occurred when decoding byte: invalid UTF-8")
        
    except json.JSONDecodeError: 
        logger.error("Error occurred when deserializing: invalid JSON document")
    
    except Exception as e:
        logger.error(f"Error occurred when fetching object from S3: {str(e)}")
    
    
def generate_bill_of_material(data):
    
    try:
        subprocess.run(["/opt/python/bin/python3.11/site-packages/syft", data , "-o", ">", "cyclonedx-json", "/tmp/product_sbom.json"], shell=True, check=True)
        logger.info(f"Successfully generated product SBOM")
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Error - Syft scan failed with exit code {e.returncode}. Output: {e.output}")
        
    except Exception as e:
        logger.error(f"Error - Unexpected error occurred during SBOM generate: {str(e)}")
        
    
def scan_bill_of_material():
    
    try:
        result = subprocess.run(["/opt/python/bin/python3.11/site-packages/grype", "sbom:/tmp/product_sbom.json"], capture_output=True, text=True, check=True)
        
        if result.stdout:
            logger.info(f"Grype Scan Output: {result.stdout}")
            
        if result.stderr:
            logger.warning(f"Grype Scan Errors: {result.stderr}")
        
        return result
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Error - Grype scan failed with exit code {e.returncode}. Output: {e.output}")
        return None
    
    except Exception as e:
        # General exception handling
        logger.error(f"Error - Unexpected error occurred during SBOM scan: {str(e)}")
        return None
    
    
    
def send_response(result):
    
    vulnerabilities = result.strout
    
    if "High" in vulnerabilities or "Critical" in vulnerabilities:
        return {
            'statusCode': 406,
            'body': json.dumps({'message': 'Critical vulnerabilities are found', 'details': vulnerabilities})
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'This product is safer', 'details': vulnerabilities})
        }
 