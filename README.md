# User Task Queuing with Rate Limiting

## Overview
This project implements a Node.js API for processing user tasks with rate limiting and queuing. Each user is allowed 1 task per second and 20 tasks per minute.

## Setup
1. Install dependencies:
'npm install'

2. Run the application:
'npm start'

3. Testing
You can test the API using a tool like Postman or CURL. Send a POST request to http://localhost:3000/api/v1/task with a JSON body containing a user_id.

json
Copy code
{
  "user_id": "123"
}

Notes:
The application uses Redis for rate limiting and queueing.
Task logs are stored in tasks.log.

Assumptions:
Redis is running on localhost with default port 6379.
No authentication is required for the API endpoints.


Thank you Ashvani s.......