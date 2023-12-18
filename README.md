# STS Loaner Tracker

This project was originally created for CSE330 at Washington University in St. Louis.
Created by Jack Heuberger and Jack Zhai.

## Description

This application is meant to streamline the laptop loaning process at Student Technology services. The current ticketing system lacks a way to do inventory management, so a convoluted mess of spreadsheets and a whiteboard are used instead.

This app gives technicians a standardized workflow that integrates (as best it can) with ServiceNow, and gives an easy way to view what laptops have currently been lent out to students. It also can remind techs to reach out to clients if the client has not responded in a certain timeframe.

# Deployment

1. Have Docker and Docker-Compose installed
2. Clone the repository and navigate to the directory
3. Run `npm run dev-db`
4. Visit localhost:8080

# For Development

1. In the root directory, run `npm run dev-db`
2. Visit localhost:8080

Note: if you want to see console.logs from server-side, run `docker-compose up -d mongo && nodemon index.js | tee >(npx browser-sync start --config ./config/bs-config.js --no-open)`

### Features

- Table to view open laptop loans
  - Highlighted dates change based on when to follow up with client
- Techs can create, view, and edit records for currently loaned laptops
  - Records can have PDFs and other files attached to them. These files can be uploaded and downloaded at will and are stored in the database.
- Data over a specific timeframe can be automatically imported into a CSV file
- Once closed, past records can still be viewed but not edited.
- Records can link to specific ServiceNow incidents.

### Todo

See issues tab.

### ENV

.env-server
```
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
```

.env
```
MONGO_USER=
MONGO_PASSWORD=
```