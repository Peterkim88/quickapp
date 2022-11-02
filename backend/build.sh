#!/usr/bin/env bash
# exit on error
# set -o errexit

pip install -r requirements.txt
cd frontend/
npm install react-paypal-button-v2 --force
npm run build
cd ..