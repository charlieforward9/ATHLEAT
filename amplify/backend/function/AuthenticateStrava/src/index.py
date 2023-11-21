import json
import traceback
import os
import boto3
import urllib3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('User-w54fbbt3v5gofg54w7frjfll6i-dev')  # Replace with your table name

client_id = os.environ['STRAVA_CLIENT_ID']
client_secret = os.environ['STRAVA_CLIENT_SECRET']

def handler(event, context):
    try:
        if isinstance(event['body'], str):
            body = json.loads(event['body'])
        else:
            body = event['body']

        # Extracting item details from the body
        userId = body['id']
        stravaCode = body['stravaCode']

        # Exchange Strava code for an access token and a refresh token
        strava_response = exchange_strava_token(stravaCode)
        access_token = strava_response['access_token']
        refresh_token = strava_response['refresh_token']

        date_last_updated = datetime.utcnow().isoformat()
        current_time_iso = datetime.utcnow().isoformat() + 'Z'

        # Updating the item into the DynamoDB table
        response = table.update_item(
            Key={'id': userId},
            UpdateExpression='SET stravaAccessToken = :at, stravaRefreshToken = :rt, '
                             'dateLastUpdated = :du, createdAt = :ca, updatedAt = :ua',
            ExpressionAttributeValues={
                ':at': access_token,
                ':rt': refresh_token,
                ':du': date_last_updated,
                ':ca': current_time_iso,
                ':ua': current_time_iso,
            }
        )
        return {
            'statusCode': 200,
            'body': json.dumps('User updated successfully')
        }
    except Exception as e:
        print(e)
        traceback.print_exc()
        return {
            'statusCode': 500,
            'body': json.dumps('Error adding item to the database')
        }

def exchange_strava_token(stravaCode):
    url = 'https://www.strava.com/oauth/token'
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': stravaCode,
        'grant_type': 'authorization_code'
    }

    # Encode the payload to JSON and prepare the headers
    encoded_payload = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json'}

    # Create a PoolManager instance
    http = urllib3.PoolManager()

    # Make the request
    response = http.request('POST', url, body=encoded_payload, headers=headers)

    # Check for HTTP errors
    if response.status != 200:
        raise urllib3.exceptions.HTTPError(response.status)

    # Return the JSON response
    return json.loads(response.data.decode('utf-8'))


