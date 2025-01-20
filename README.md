# Social Network API
To build an API from scratch for a social network web application where users can share their thoughts, react to friends thoughts and create a friend list.

The application is built in typescript using Express.Js for routing, MongoDb for Database, and the mongoose ODM package. The timestamps are formated usng the native javascript Date object.

## Table of Contents 
- [Social Network API](#social-network-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Database design](#database-design)
  - [API routes.](#api-routes)
  - [Demo](#demo)
  - [License](#license)
  - [Questions](#questions)

## Installation
1. Clone the repository:
    git clone git@github.com:gitkaviyarasi/socialnetworkapi.git
2. Navigate to the project directory and create a branch and open Code editor.
3. Run `npm i` to install the dependencies. 
   

## Usage
Run `npm dev`/`npm run dev` and test the routes in the insomnia as the front end is not yet built. 

## Database design
    The App has 2 Models 
    1. User 
            User model has username,email,thoughts (an array of id's referencing the thougth) and friends (an array of id's referencing the user).
            Virtual for storing the friend count.
    2. Thought.
            Thought model has thoughtText,createdAt,username,and reactions(an array of nested documents created with reaction schema).
            Virtual for storing reaction count.
            Reaction schema will have reactionId,reactionBody,username,createdAt.

## API routes.
1. User routes.  - `api/users`

a.GET all users
b.POST a new user 
/api/users/:userId
c.GET a single user by its _id and populated thought and friend data
d.PUT to update a user by _id.
e.DELETE to remove user by its _id  (it removes a user's associated thought also)
./api/users/:userId/friends/:friendId

f.POST to add a new friend to a user's friend list
g.DELETE to remove a friend from a user's friend list

2. Thought routes - /api/thoughts

a.GET to get all thoughts
b.GET to get a single thought by its _id
c.POST to create a new thought. The created thought will also be pushed to the associated user's thoughts array field.
d.PUT to update a thought by its _id
e.DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions
f.POST to create a reaction stored in a single thought's reactions array field
g.DELETE to pull and remove a reaction by the reaction's reactionId value

## Demo
A walkthrought video that shows the functionality for the socail media API, the demo shows all the implemted endpoints. The delete user endpoint in the demo shows all that all the thoughts were deleted since all the tested tested thoughts were created by the same user.

https://drive.google.com/file/d/1gsUiAsWF67xJUmzxHlE085MiuaD33pIU/view?usp=sharing


## License
MIT

## Questions
If you have any questions about this project, feel free to reach out:

GitHub: gitkaviyarasi 
Email: kaviyarasikrishnannj@gmail.com
