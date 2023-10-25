import json

def handler(event, context):
    #Receive token from user
    print('received event:')
    print(event)
    body = {}
    #token = json.loads(event['body'])['token']
    body['token'] = event
    body['wepassinginfo'] = "look at this succcessful output! dope!"
    """
    PROPER FORMAT FOR LAMBDA OUTPUT:
    {
        "isBase64Encoded": true | false,
        "statusCode": httpStatusCode,
        "headers": {"headerName": "headerValue", ...},
        "multiValueHeaders": {"headerName": ["headerValue", "headerValue2", ...], ...},
        "body": "..."
    }
    """
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)  # Convert the body object to a JSON string
    }


