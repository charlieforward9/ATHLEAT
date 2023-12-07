import json
import os
import datetime
import urllib3
import boto3
import uuid
from botocore.exceptions import ClientError

def handler(event, context):
    # DynamoDB setup
    dynamodb = boto3.resource('dynamodb')
    user_table = dynamodb.Table('User-w54fbbt3v5gofg54w7frjfll6i-dev')
    event_table = dynamodb.Table('Event-w54fbbt3v5gofg54w7frjfll6i-dev')

    if isinstance(event['body'], str):
        body = json.loads(event['body'])
    else:
        body = event['body']

    # User ID from the event
    user_id = str(body['user_id'])

    # Query the User table for the specific user
    try:
        response = user_table.get_item(Key={'id': user_id})
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS, POST'
            },
            'body': json.dumps(f"Error accessing DynamoDB: {e.response['Error']['Message']}")
        }

    user = response.get('Item')
    if not user:
        return {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS, POST'
            },
            'body': json.dumps("User not found.")
        }

    #retrieve user's food description
    event_type = str(body['event_type'])
    event_json = body['event_json']






    current_time_iso = datetime.datetime.utcnow().isoformat() + 'Z'

    event_item = {
        'id': str(uuid.uuid4()),
        'type': event_type,
        'eventJSON': json.dumps(event_json),
        'date': str(body['event_json']['date']),
        'time': str(body['event_json']['time']),
        'createdAt': current_time_iso,
        'updatedAt': current_time_iso,
        'userID': user_id,
        '_lastChangedAt': int(datetime.datetime.utcnow().timestamp()),
        '_version': 1,
        '_deleted': False

    }
    try:
        event_table.put_item(Item=event_item)
    except ClientError as e:
        # handle exception
        print(f"Error adding event to DynamoDB: {e.response['Error']['Message']}")

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
        'body': event_item['eventJSON']
    }