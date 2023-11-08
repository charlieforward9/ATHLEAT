import json
import traceback

import boto3
from botocore.exceptions import ClientError
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('User-pzdnhl4hjveflkg4qgshasqyei-dev')  # Replace with your table name

def handler(event, context):
    try:
        if isinstance(event['body'], str):
            body = json.loads(event['body'])
        else:
            body = event['body']

            # Extracting item details from the body
        name = body['name']
        email = body['email']
        stravaToken = body['stravaToken']

        # Generating a unique ID for the item
        item_id = str(0)
        date_last_updated = datetime.utcnow().isoformat()

        # Putting the item into the DynamoDB table
        response = table.put_item(
            Item={
                'id': item_id,
                'name': name,
                'email': email,
                'stravaToken': stravaToken,
                'dateLastUpdated': date_last_updated
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps('Item created successfully')
        }
    except Exception as e:
        print(e)
        traceback.print_exc()
        return {
            'statusCode': 500,
            'body': json.dumps('Error adding item to the database')
        }


def generate_unique_id():
    # Placeholder for unique ID generation logic
    # You could use UUID or another method to generate unique IDs
    return 'unique-id-placeholder'
"""
def handler(event, context):
    #Receive token from user
    print('received event:')
    print(event)
    body = {}
    #token = json.loads(event['body'])['token']
    body['token'] = event
    body['wepassinginfo'] = "look at this succcessful output! dope!"
    
    PROPER FORMAT FOR LAMBDA OUTPUT:
    {
        "isBase64Encoded": true | false,
        "statusCode": httpStatusCode,
        "headers": {"headerName": "headerValue", ...},
        "multiValueHeaders": {"headerName": ["headerValue", "headerValue2", ...], ...},
        "body": "..."
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)  # Convert the body object to a JSON string
    }

"""
