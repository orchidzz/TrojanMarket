# TrojanMarket

## Motivation
I wanted to learn React so it's best to learn by building!

## Description
Just a web app to emulate an e-commerce site that only people with USC google accounts can login. Tried to implement new features over time like messaging and rating 
Note: cannot host this on Cyclic despite using its AWS storage features because some env var runs more than the allowed 255 max chars

## Lessons
- React framework basics like states, hooks, router, and also Redux for state management.
- Firebase SDK like Google authentication
- AWS SDK for DynamoDB and S3 for storage
- Schema for key-value NoSQL database as AWS uses partition and sort keys as primary key
- Implementing middlewares for Express server

## To run locally
- Replace env vars (for AWS and Firebase) with approriate credentials: PORT, CYCLIC_BUCKET_NAME, CYCLIC_DB, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_CLIENT_ID, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_X509_CERT_URL
- run ```node app.js``` in either ```/``` or ```/backend```

## Some looks
![My project-1](https://github.com/orchidzz/TrojanMarket/assets/65925715/0f266613-1ed3-4a48-8d68-0299adf127d2)
