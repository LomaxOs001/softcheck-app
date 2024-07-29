import json
import boto3
import logging
import urllib.parse
import subprocess
import tempfile
from pathlib import Path


logger = logging.getLogger()
logger.setLevel(logging.INFO)
S3API = boto3.client("s3", region_name="us-east-1") 
SQSAPI = boto3.client("sqs", region_name="us-east-")

    
    
def process_with_product_sbom(arg):
    
    get_upload_product(arg)
    
    generate_bill_of_material("package-lock.json")
    #Scan the generated SBOM
    result = scan_bill_of_material()
    
    if result is None:
        logger.error(f"Failed to scan SBOM")
        return
            
    #Send response via API
    send_response(result)
        
    delete_temp_data("/temp/product_sbom.json")
        
    
    
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
        objectContentInByte = response["Body"].read()
        
        logger.info(f"Object content in Byte: {objectContentInByte}")
        
        obectContentInString = json.loads(objectContentInByte.decode('utf-8'))
        #logger.info(f"Object content in String:{obectContentInString}")
        
        manage_temp_file(obectContentInString)
        
        
            
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
        
        
        
def manage_temp_file(objectAsByte):

    global temp_file

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as temp_f:
            
            temp_f.write(json.dumps(objectAsByte).encode('utf-8'))
            temp_file = temp_f.name
            
            logger.info(f"Created a temporary file: {temp_file}")
        
        #generate a SBOM file of this product
        generate_bill_of_material(temp_file)
        
        delete_temp_data(temp_file)
    

    except Exception as e:
        logger.error(f"Error occurred when creating a temporary file: {str(e)}")
        
    
    
def generate_bill_of_material(data):
    
    try:
        result = subprocess.run(["syft", "scan", data, "-o", "cyclonedx-json"], text=True, check=True, capture_output=True)

        
        with open("/temp/product_sbom.json", "w") as f_sbom:
            f_sbom.write(result.stdout)
        
        logger.info(f"Successfully generated product SBOM")
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Error - Syft scan failed with exit code {e.returncode}. Output: {e.output}")
        
    except Exception as e:
        logger.error(f"Error - Unexpected error occurred during SBOM generate: {str(e)}")
    
    
        
    
def scan_bill_of_material():
    
    try:
        result = subprocess.run(["grype", "sbom:/temp/product_sbom.json"], capture_output=True, text=True, check=True)
        
        
        if result.stdout:
            #print(f"Grype Scan Output: {result.stdout}")
            logger.info(f"Grype Scan Output: {result.stdout}")
            
        if result.stderr:
            logger.error(f"Grype Scan Errors: {result.stderr}")
        
        logger.info(f"Successfully scanned product SBOM")
        
        return result
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Error - Grype scan failed with exit code {e.returncode}. Output: {e.output}")
        return None
    
    except Exception as e:
        logger.error(f"Error - Unexpected error occurred during SBOM scan: {str(e)}")
        return None
    
    
    
def send_response(result):
    
    vulnerabilities = result.stdout
    
    if "High" in vulnerabilities or "Critical" in vulnerabilities:
        return {
            'statusCode': 406,
            'body': json.dumps({'message': 'Critical vulnerabilities are found', 'details': vulnerabilities})
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'The product looks safer', 'details': vulnerabilities})
        }
        
def delete_temp_data(temp_data):
    
    temp_path = Path(temp_data)
    
    if not temp_path.exists():
        logger.error(f"Error - The path {temp_path} does not exist")
        
        
    try:
        if temp_path.is_file():
            temp_path.unlink()
        logger.info(f"Successfully deleted {temp_data}")
            
    except OSError as e:
        logger.error(f"Error deleting a file in {temp_path}: {str(e)}")
        
if __name__ == '__main__':
    process_with_product_sbom(event)