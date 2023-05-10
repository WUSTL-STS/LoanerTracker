# STS Loaner Tracker

This project was originally created for CSE330 at Washington University in St. Louis.
Created by Jack Heuberger and Jack Zhai.

## Description

This application is meant to streamline the laptop loaning process at Student Technology services. The current ticketing system lacks a way to do inventory management, so a convoluted mess of spreadsheets and a whiteboard are used instead.

This app gives technicians a standardized workflow that integrates (as best it can) with ServiceNow, and gives an easy way to view what laptops have currently been lent out to students. It also can remind techs to reach out to clients if the client has not responded in a certain timeframe.

# Running Locally

1. Have Docker and Docker-Compose installed
2. Clone the repository and navigate to the directory
3. Run `docker-compose up`
4. Visit localhost:8080

# For Development:

1. Compose the Docker using: `docker-compose -f docker-compose.dev.yml up`
2. In the root directory, run `npm run dev`
3. Visit localhost:3000

### Features

- Table to view open laptop loans
  - Highlighted dates change based on when to follow up with client
- Techs can create, view, and edit records for currently loaned laptops
  - Records can have PDFs and other files attached to them. These files can be uploaded and downloaded at will and are stored in the database.
- Data over a specific timeframe can be automatically imported into a CSV file
- Once closed, past records can still be viewed but not edited.
- Records can link to specific ServiceNow incidents.

### Todo

- Style similar to WashU themes/vibes
- Better directions
- Only each laptop should only be loaned out once
- Make a grid view of the loaner laptop cart
- Validation for dates, emails, id etc... (but also allow to be empty if they do not know)
- List view can search by/sort by any of the fields (also this for historical but not as important)
