## Description

In this application I used Nest.js, PostgreSQL and Redis-stack (Redis with a user interface for visualizing information from Redis).
In this project I did not implement DDD or pure architecture, I used the modular approach recommended in the documentation.

## Running the app

Since I used docker-compose, all you need to do is run the command **docker-compose up** (and of course install docker on your machine)

```bash
$ docker-compose up
```
## Endpoints to test
- http://localhost:3000/users (POST method to create user)
- http://localhost:3000/users/get-user-by-id?id=1 (GET method to get user by id)
- http://localhost:3000/proxy?url=https://jsonplaceholder.typicode.com/todos (GET method for GET request to particular url across proxy)
- http://localhost:3000/ (GET method for Hellow world)

## Test

For testing you should use Postman to send requests, UI for Redis (http://localhost:8001/) and you can also use DBeaver to connect to PostgreSQL. I haven't implemented ConfigService so you can see all the credentials in the code.

**For DB**
- password = root
- user = postgres
- database = test
- port = 5433

