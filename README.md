# Blog Management API
This is a simple blog management API that allows authenticated user to peform CRUD operations on posts they created.

## Install and Setup
One way you can do this is by simply running it in docker

NOTE: To run locally replace process.env.MONGO_URI with mongodb cluster connection string for node.js

```bash
docker run -it -p 9000:4000 -v $(pwd):/app blog-management-api
```
Now you can visit localhost:9000 on your browser


Another method will be to manually set-up:
Note: This will require you install or currently have Node.js. I recommend Node.js version >= 18 as versions 14 and 16 are deprecated 

1. Install packages from package.json file

```bash
npm install
```
2. Start the server at localhost:4000

```bash
npm start
```

## Using the API

### Authentication
1. Create an account
To create account use route '/auth/signup' and append credentials object in the body of the POST request as follows:
Eg. {
    "credentials": {
        "fullname": "John Mensah",
        "email": "jmensah@gmail.com",
        "password": "Pa55wed@54321"
    }
}

2. Sign in
To login use route '/auth/signin' and append credentials object with email and password in the body of the POST request as follows:
Eg. {
    "credentials": {
        "email": "jmensah@gmail.com",
        "password": "Pa55wed@54321"
    }
}



### CRUD operations
Add the token generated from authenticating to your Authorization header in all subsequent requests.

3. Create post
Use route '/posts/create' and append post object to create post as follows:
Eg. {
    "post": {
        "title": "Blog post",
        "topic": "Calculus",
        "content": "This is my first post."
    }
}


4. View all posts
Use route '/posts/' to view all post created by current user

5. View single post
Use route '/posts/:_id' to view a specific post created by current user. Replace :_id with MongoDB object _id as follows:
Eg. /posts/652a7e8473984c86543584a8

6. Update post
Use route '/posts/update/:_id'. Replace :_id and append post object to update post as follows:
Eg. {
    "post": {
        "title": "Blog post",
        "topic": "Calculus II",
        "content": "This is my updated post."
    }
}

7. Delete post
Use route '/posts/delete/:_id'. Replace :_id as follows:
Eg. /posts/delete/652a7e8473984c86543584a8