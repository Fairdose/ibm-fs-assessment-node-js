#!/bin/bash
clear

echo "Command: curl \"http://localhost:5001\" | jq -r"

echo "Output: "

curl "http://localhost:5001" | jq -r