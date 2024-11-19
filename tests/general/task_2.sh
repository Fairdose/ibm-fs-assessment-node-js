#!/bin/bash
clear

echo "Command: curl \"http://localhost:5001/isbn/4\" | jq -r"

echo "Output: "

curl "http://localhost:5001/isbn/4" | jq -r