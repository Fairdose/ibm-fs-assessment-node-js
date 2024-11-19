#!/bin/bash

clear

HEADER="Content-Type: application/json"
REGISTERED_DATA='{ "username": "token_user", "password": "token_password" }'
NOT_REGISTERED_DATA='{ "username": "non_existing_user", "password": "token_password" }'
RESPONSE_FILE="../authentication/.jwt"

# region 1
echo 'Test: Not registered user'

echo "Command: curl -X POST http://localhost:5001/customer/login --header \"$HEADER\" --data '$NOT_REGISTERED_DATA' -o- '$RESPONSE_FILE' | jq -r"

curl -X POST http://localhost:5001/customer/login --header "$HEADER" --data "$NOT_REGISTERED_DATA" | jq -r

# region 2

echo 'Test: Registered user'

echo "Command: curl -X POST http://localhost:5001/customer/login --header \"$HEADER\" --data '$REGISTERED_DATA' -o- '$RESPONSE_FILE'"

curl -X POST http://localhost:5001/customer/login --header "$HEADER" --data "$REGISTERED_DATA" -o "$RESPONSE_FILE"

echo -e "\nAuth token:"

cat ../authentication/.jwt

echo -e "\nAuth Token saved at relative path '../authentication/.jwt'\n"