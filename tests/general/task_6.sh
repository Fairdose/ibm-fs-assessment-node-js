#!/bin/bash
clear

# region 1
echo 'Test: No username or password provided'

echo 'Command: curl -X POST "http://localhost:5001/register" | jq -r'

echo "Body:"

echo "Output: "

curl -X POST "http://localhost:5001/register" | jq -r

# region 2

HEADER="Content-Type: application/json"
DATA='{ "username": "user_1", "password": "123456" }'

echo 'Test: Valid username and password provided'

echo "Command: curl -X POST http://localhost:5001/register --header \"$HEADER\" --data '$DATA' | jq -r"

curl -X POST http://localhost:5001/register --header "$HEADER" --data "$DATA" | jq -r

# region 3

echo 'Test: Existing username and password provided'

echo "Command: curl -X POST http://localhost:5001/register --header \"$HEADER\" --data '$DATA' | jq -r"

curl -X POST http://localhost:5001/register --header "$HEADER" --data "$DATA" | jq -r