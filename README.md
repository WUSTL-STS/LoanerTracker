# CSE330
Jack Heuberger - 485964 - jackheuberger

Jack Zhai - 475411 - zhais576

# Running Locally
1. Have Docker and Docker-Compose installed
2. Clone the repository and navigate to the directory
3. Run the command `docker-compose up --build`
4. Visit localhost:8080

## Project Description
I (Jack Heuberger) work at Student Technology Services as a technician. One of the services we offer is that we lend out loaner laptops to students who have broken their laptop and are getting it repaired or purchasing a new one. Our current ticketing system lacks a way to do inventory management, so we currently use a convoluted mess of spreadsheets and a whiteboard. This app in theory would replace everything and give techs an easy way to view what laptops have currently been lent out to students and remind techs to reach out to clients if we've gone a certain amount of time without hearing from them. 

## Rubric
Frameworks:
- Learned Express (10pts)
- Learned MongoDB (10pts)
- Learned Docker (5pts)

Functionality (50 pts):
- [x] Way to view currently loaned laptops (5)
  - [x] Timer for when to follow up with client (5)
- [x] STS Techs can view and edit records for currently loaned laptops (10)
  - [x] Attach PDFs to records (5)
- [x] Techs can view records for previous laptop loans (5)
- [x] Techs can create new records (5)
- [x] Export data over a time range to csv (ex: how many laptops have been loaned in the past 4 months)(10)
- [x] Styling (5)

Creative Portion:
- [x] Tickets can be closed. They are removed from the table but kept in the historical view. (5pts)
- [X] Code is well formatted and easy to read, page pass the HTML Validator and is safe from code injection (5pts)
- [x] Search box to find records by TicketID (5pts)
- [X] Detailed instruction for the user (5pts)

Rubric Submission (5pts)
- Approved by Kate Uchida
