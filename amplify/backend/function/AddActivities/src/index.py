import json
import os
import datetime
import urllib3
import boto3
from botocore.exceptions import ClientError


def refresh_strava_token(user):
    http = urllib3.PoolManager()
    url = 'https://www.strava.com/oauth/token'
    payload = {
        'client_id': os.environ['STRAVA_CLIENT_ID'],
        'client_secret': os.environ['STRAVA_CLIENT_SECRET'],
        'grant_type': 'refresh_token',
        'refresh_token': user['stravaRefreshToken']
    }

    encoded_payload = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json'}

    response = http.request('POST', url, body=encoded_payload, headers=headers)
    if response.status != 200:
        raise Exception(f"Error refreshing Strava token: {response.status}")

    return json.loads(response.data.decode('utf-8'))


def handler(event, context):
    # DynamoDB setup
    dynamodb = boto3.resource('dynamodb')
    user_table = dynamodb.Table('User-w54fbbt3v5gofg54w7frjfll6i-dev')
    event_table = dynamodb.Table('Event-w54fbbt3v5gofg54w7frjfll6i-dev')

    # Current time
    now = datetime.datetime.utcnow()

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
            'body': json.dumps(f"Error accessing DynamoDB: {e.response['Error']['Message']}")
        }

    user = response.get('Item')
    if not user:
        return {
            'statusCode': 404,
            'body': json.dumps("User not found.")
        }

    # Check if the token needs refreshing
    last_updated = datetime.datetime.fromisoformat(user['dateLastUpdated'])
    if now - last_updated > datetime.timedelta(hours=6):
        # Refresh the token
        new_tokens = refresh_strava_token(user)

        # Update user in DynamoDB
        try:
            user_table.update_item(
                Key={'id': user_id},
                UpdateExpression='SET stravaAccessToken = :at, stravaRefreshToken = :rt, dateLastUpdated = :du',
                ExpressionAttributeValues={
                    ':at': new_tokens['access_token'],
                    ':rt': new_tokens['refresh_token'],
                    ':du': now.isoformat()
                }
            )
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': json.dumps(f"Error updating DynamoDB: {e.response['Error']['Message']}")
            }

        access_token = new_tokens['access_token']
    else:
        access_token = user['stravaAccessToken']

    # Fetch activities from Strava
    http = urllib3.PoolManager()
    activities_url = 'https://www.strava.com/api/v3/athlete/activities'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = http.request('GET', activities_url, headers=headers)
    if response.status != 200:
        return {
            'statusCode': response.status,
            'body': json.dumps("Error fetching activities from Strava")
        }

    activities = json.loads(response.data.decode('utf-8'))
    event_item = {
        'id': user_id,  # User ID
        'typeOfEvent': 'stravaActivity',
        'eventJSON': json.dumps(activities)
    }


    # Add each activity to Event table
    """for activity in activities:
        event_item = {
            'id': user_id,  # User ID
            'typeOfEvent': 'stravaActivity',
            'eventJSON': json.dumps(activity)
        }

        try:
            event_table.put_item(Item=event_item)
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': json.dumps(f"Error adding event to DynamoDB: {e.response['Error']['Message']}")
            }
    """
    try:
        event_table.put_item(Item=event_item)
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error adding event to DynamoDB: {e.response['Error']['Message']}")
        }
    return {
        'statusCode': 200,
        'body': json.dumps(f"Activities added for user {user_id}")
    }