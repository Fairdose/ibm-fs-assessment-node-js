#!/bin/bash

clear

DATA='{ "username": "token_user" }'
CONTENT_TYPE="Content-Type: application/json"
AUTH="Authorization: $(cat ../authentication/.jwt)"

echo 'Test: Delete a review'

echo "Command: curl -X DELETE http://localhost:5001/customer/auth/review/4 --header \"$CONTENT_TYPE\" --header \"$AUTH\" --data '$DATA' | jq -r"

curl -X DELETE http://localhost:5001/customer/auth/review/4 --header "$CONTENT_TYPE" --header "$AUTH" --data "$DATA" | jq -r