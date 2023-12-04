import json
import os
import openai
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
    food_desc = str(body['food'])

    #instantiate message chain with system prompt and user's description inserted
    messages = [
        {
        "role": "system",
        "content": """Estimate the calories and macronutrients for the described food(s)/meals/snack. Return your answer in json structure of the format: 
        {"calories": x, "protein": x, "fat": x, "carbs": x}
        Return ONLY 1 json object. Make the values as accurate as possible based on your knowledge of the foods described and typical portion sizes. Units should be grams for the macronutrients and Calories for the calories."""
        },
        {
        "role": "user",
        "content": food_desc
        }]

    #make call to OpenAI for chat completion
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages,
        temperature=0,
        response_format ={ "type": "json_object" }
        )
    #parse response into json obj
    json_parsed = json.loads(response.choices[0].message.content)
    json_parsed['food'] = food_desc
    json_parsed['date'] = str(body['meal_date'])
    json_parsed['time'] = str(body['meal_time'])

    current_time_iso = datetime.datetime.utcnow().isoformat() + 'Z'

    event_item = {
        'id': str(uuid.uuid4()),
        'type': 'nutritionEvent',
        'eventJSON': json.dumps(json_parsed),
        'date': str(body['meal_date']),
        'time': str(body['meal_time']),
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

    # TODO implement
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS, POST'
        },
        'body': event_item['eventJSON']
    }