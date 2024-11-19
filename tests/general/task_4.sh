#!/bin/bash
clear

echo "Command: curl \"http://localhost:5001/title/and\" | jq -r"

echo "Output: "

curl "http://localhost:5001/title/and" | jq -r