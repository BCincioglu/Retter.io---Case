# RETTER.IO - Leaderboard Case

## Overview
This application provides a scalable leaderboard system for a gaming platform. It allows players to submit their scores, view the top-ranked players, and check their individual rankings. The system is designed for performance and simplicity, leveraging Redis for fast leaderboard storage and MongoDB for user data management.

## Installation Steps

### 1. Clone the Application

First, clone the repository to your local machine using the following command:

```sh
git clone https://github.com/BCincioglu/Retter.io---Case.git
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```sh
cd Retter.io---Case
npm install
```

### 3. Run With Docker

If you do not have docker on your computer, download docker. After that you can run application one simple command below:

```sh
docker compose up --build
```

## Test Steps (Recommended)

### 1. Create Token with User ID

#### Request : http://localhost:3000/auth/login

#### HTTP Method: POST
```json
{
    "userId": "1"
}
```
#### Response
```json
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzM1MDg0NzY0LCJleHAiOjE3MzUwODgzNjR9.dMV7lLeluKo_ykB46RmCQaYFRkQjFM9y8DuPLa9Lb-w"
}
```
### 2. Submit Score

#### Request : http://localhost:3000/leaderboard/submit-score

#### HTTP Method: POST
```
Header: Authorization - Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNzM1MDg0NzY0LCJleHAiOjE3MzUwODgzNjR9.dMV7lLeluKo_ykB46RmCQaYFRkQjFM9y8DuPLa9Lb-w
```
```json

{
    "score": 100,
    "gameId": "game1"
}
```
#### Response
```json
{
    "userId": "1",
    "gameId": "game1",
    "score": 100,
    "rank": 1
}
```
NOTE: No more userId require while score submitting, becasue token already has that information.

### 3. Show Leaderboard

#### Request : http://localhost:3000/leaderboard/top?limit=10&page=1

#### HTTP Method: GET

#### Response
```json
[
    {
        "rank": 1,
        "userName": "Charlie",
        "score": 12
    },
    {
        "rank": 2,
        "userName": "Bob",
        "score": 11
    },
    {
        "rank": 3,
        "userName": "Alice",
        "score": 10
    }
]
```
### 4. Show Players Individual Highest Score

#### Request : http://localhost:3000/leaderboard/rank?userId=1

#### HTTP Method: GET

#### Response
```json
{
    "userId": "1",
    "rank": 1,
    "score": 100
}
```
#### OR
```json
{
    "error": "Invalid User ID"
}
```



