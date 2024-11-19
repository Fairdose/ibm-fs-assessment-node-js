#!/bin/bash

clear

DATA='{ "username": "token_user", "password": "token_password", "review": "If you enjoyed it give Der Löwe von Uruk a chance too." }'
CONTENT_TYPE="Content-Type: application/json"
AUTH="Authorization: $(cat ../authentication/.jwt)"

echo 'Test: Post a review'

echo "Command: curl -X PUT http://localhost:5001/customer/auth/review/4 --header \"$CONTENT_TYPE\" --header \"$AUTH\" --data '$DATA' | jq -r"

curl -X PUT http://localhost:5001/customer/auth/review/4 --header "$CONTENT_TYPE" --header "$AUTH" --data "$DATA" | jq -r