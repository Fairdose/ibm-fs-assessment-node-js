#!/bin/bash
clear

echo "Command: curl \"http://localhost:5001/review/6\" | jq -r"

echo "Output: "

curl "http://localhost:5001/review/6" | jq -r