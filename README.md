# Task Manager Project

Project Overview :

This is a Fullstack Task Management System built with:

Backend: Spring Boot 3.4.10 (there is no 3.2.2 on start.spring.io)

Node.js : 22.16.0

Frontend: Angular 18.2.21
    Libraries: Bootstrap, Fontawesome

State Management: Signals(for getting data), Rxjs(for posting, updating and toastService)

Database: MongoDB (localhost)

UI DB Tool: Mongo Express

--------------------------------------------------------------

Prerequisites :

Java 17+

Maven

Node.js & npm/yarn

Docker & Docker Compose

Git

MongoDB Compass (optional for DB GUI)

--------------------------------------------------------------

Instructions :

git clone https://github.com/baha-jmn/task-manager.git
cd task-manager

Dev:
docker compose --env-file .env.dev up -d

Prod:
docker compose --env-file .env.prod up -d

MongoDB will be available at:
mongodb://localhost:27017

Mongo Express UI will be available at:
http://localhost:8081

--------------------------------------------------------------
Backend :

cd backend
./mvnw clean install
./mvnw spring-boot:run

or run directly from the IDE

Backend API runs on:
http://localhost:8080

Unit Testing (JUnit, Mockito):
TaskServiceTest.java
TaskControllerTest.java

--------------------------------------------------------------
Frontend :

cd frontend
npm install

for serving :
ng serve --configuration=development
ng serve --configuration=production

for building :
ng build --configuration=development
ng build --configuration=production

Frontend runs on:
http://localhost:4200

Unit Testing (Jasmine, Karma):
task.service.spec.ts


--------------------------------------------------------------
Postman Collection (tested APIs) :

Link to GitHub postman collection file :
You can test API endpoints with the provided Postman collection:
https://github.com/baha-jmn/task-manager/blob/main/postman/task-manager-api.postman_collection.json


--------------------------------------------------------------
Notes

If you want to inspect the MongoDB database visually, use MongoDB Compass or Mongo Express.

Make sure Docker is running before starting the backend.
