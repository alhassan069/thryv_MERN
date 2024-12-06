# Description

This is a containerized Node.js (Javascript) app that integrates MySQL and Redis to allow users to easily revisit products they've recently shown interest in.

## Run the app
- `docker-compose up --build`

### After the containers are up and running 
- Run this command in another terminal to populate dummy data
- `docker exec -it thryv-backend-1 node init_db/insertProducts.js`

### Frontend
[http://localhost:3000/](http://localhost:3000/)

### Open Api documentation (Swagger)
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)