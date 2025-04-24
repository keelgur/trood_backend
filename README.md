# Trood Backend Part: REST API
## Description
Simple and working REST API for data manipulation with vacancies and projects in future web application.
Supplied with schemas for models, according to the examples. Using MongoDB for data storing.
## Installation
`git pull` in your desired location, `npm i` to download all dependecies.
To start a server - `npm start`.
## Used frameworks and dependencies
express-^5.1.0
npm-11.3.0
node-v22.14.0
mongoose-^8.13.2
morgan-^1.10.0
mongodb-^6.15.0
nodemon-^3.1.9
## Mock-data for a mock server
The app can be tested using Postman mock server collection of requests:
```
GET {{url}}/projects | response: 200 OK | response body: array of json objects
GET {{url}}/projects/{{foundObjectID}}/vacancies | response: 200 OK | response body: array of json objects
GET {{url}}/projects/{{notObjectID}}/vacancies | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
GET {{url}}/projects/{{notFoundObjectID}}/vacancies | response: 404 Not Found | response body: {"message":"No valid document found for provided ID" }

POST {{url}}/projects | request body: json object based on Project model | response: 201 Created | {"message": "You have created a project!", "createdProject": newObjectID, }
POST {{url}}/projects/{{notFoundObjectID}}/vacancies | request body: json object based on Vacancy model | response: 404 Not Found | response body: {"message":"Not found project with supplied ID." }
POST {{url}}/projects/{{notObjectID}}/vacancies | request body: json object based on Vacancy model | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
POST {{url}}/projects/{{foundObjectID}}/vacancies | request body: json object based on Vacancy model | response: 201 Created | {"message": "You have added a vacancy to a project!", "createdVacancy": newObjectID, }

PUT {{url}}/projects/{{notObjectID}} | request body: json object based on Project model | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
PUT {{url}}/projects/{{notFoundObjectID}} | request body: json object based on Project model | response: 201 Created | {"message": "Not found project with supplied ID. Created new." }
PUT {{url}}/projects/{{foundObjectID}} | request body: json object based on Project model | response: 200 OK | {"message": "Updated the project!" }
PUT {{url}}/vacancies/{{notObjectID}} | request body: json object based on Vacancy model | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
PUT {{url}}/vacancies/{{notFoundObjectID}} | request body: json object based on Vacancy model | response: 201 Created | {"message": "Not found vacancy with supplied ID. Created new." }
PUT {{url}}/vacancies/{{foundObjectID}} | request body: json object based on Vacancy model | response: 200 OK | {"message": "Updated the vacanncy!" }

DELETE {{url}}/projects/{{notObjectID}} | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
DELETE {{url}}/projects/{{notFoundObjectID}} | response: 404 Not Found | response body: {"message":"Not found project with supplied ID." }
DELETE {{url}}/projects/{{foundObjectID}} | response: 200 OK | {"message": "Successfully deleted the project!" }
DELETE {{url}}/vacancies/{{notObjectID}} | response: 400 Bad Request | response body: {"message":"Invalid ObjectId was requested.", "id": {{notObjectID}}, }
DELETE {{url}}/vacancies/{{notFoundObjectID}} | response: 404 Not Found | response body: {"message":"Not found vacancy with supplied ID." }
DELETE {{url}}/vacancies/{{foundObjectID}} | response: 200 OK | {"message": "Successfully deleted the vacancy!" }
```

## Deployment
Deployment of the app is powered by Render
Link - `https://trood-backend-jbot.onrender.com`
Responses can be a little slow due to the technical issues
