# Project Name

<br>

# Hiking in Nepal

<br>

## Description

A website that provides all the accesible mountains in Nepal. The website provides all the informations neccessary if you plan to hike in Nepal. You can also see the experience of other people.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so I can see the mountains that the website provides.
-  **Login:** As a user I can login to the platform so that I can access my profile and start adding mountains that I would like to do. I want to be able to add my experience so I can help people get to know what to expect from that specific hike.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of mountains that I want to do and be able to delete them, or edit the trails that I have created.
-  **Add Trails:** As a logged in user I can access the add trail page so that I can create a new trail.
-  **Edit Trails:** As a logged in user I can access the edit trail page so that I can edit the trail I created.
-  **Add Comments:** As a user I can add comments on the comunity page or on a specific route. (still thinking about this)
-  **View Mountain Details:** As an user I want to be able to see the mountain, to go to the details of the specific mountain and add it to my list.





<!-- ## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating -->


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/user-profile`              | ProfilePage          | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/trail/add`           | CreateTrailPage | user only `<PrivateRoute>` | Create new trail form.                               |
| `/trails`               | TrailsListPage   | user only `<PrivateRoute>` | Trails list.                                         |
| `/trail/:trailId` | TrailDetailsPage | user only `<PrivateRoute>` | Trail details. Shows players list and other details. |
                                 |
                          |




## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- CreateTrailPage

- MountainsListPage

- MountainsDetailsPage




  

Components:

- UserExperienceTrail
- Mountains
- Navbar






## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`

- **Mountains Service**

  - `mountainService` :
    - `.addMountain(mountainData)`
    - `.getMountains()`
    - `.getOneMountain(id)`
    - `.deleteMountain(id)`

- **UserExperienceTrail Service**

  - `userExperienceTrailService` :
    - `.createUserExperienceTrail(id)`
    - `.getUserExperienceTrail(id)`
    - `.deleteUserExperienceTrail(id)`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: String,

	
  createdTrails: [ { type: Schema.Types.ObjectId, ref:'UserExperienceTrail' } ]
}
```



**Mountains model**

```javascript
 {
   name: String,
   img: String,
   description: String, 
   distance: Number,
   average_time: Number, 
   difficulty: String, 
   season: String,
   maps: String,
   condition: String,
   review: String,
...
 }
```



**UserExperienceTrail model**

```javascript
{
  name: String,
  profileImage: String,
  description: String, 
  distance: Number,
  average_time: Number, 
  difficulty: String, 
  ...
}

```

**Comments model**

```javascript
{
   user:  { type: Schema.Types.ObjectId, ref:'User' } 
   comment: String,
   trail: { type: Schema.Types.ObjectId, ref:'UserExperienceTrail' } 
  
}

```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |
| GET         | `/api/mountains`     |                              |                | 400          | Show all mountains                                         |
| GET         | `/api/mountains/:id` |                              |                |              | Show specific mountains                                     |
| POST        | `/api/mountains`     | { name, img, mountains }       | 201            | 400          | Create and save a new mountains                             |                                                                                    
| GET         | `/api/userCreatedTrails/:id`     |                              |                |              | show specific userCreatedTrails                                         |
| POST        | `/api/userCreatedTrails`         | { name, img, userCreatedTrailsId }  | 200            | 404          | add userCreatedTrails                                                   |
| PUT         | `/api/userCreatedTrails/:id`     | { name, img }                | 201            | 400          | edit userCreatedTrails                                                  |
| DELETE      | `/api/userCreatedTrails/:id`     |                              | 200            | 400          | delete userCreatedTrails                                                |
comments            
| GET         | `/api/comments`     |                              |                |              | show specific userCreatedTrails                              |
| POST        | `/api/comments`         | { name, img, commentsId }  | 200            | 404          | add comments                                                   |
| PUT         | `/api/comments/:id`     | { name, img }                | 201            | 400          | edit comments                                                  |
| DELETE      | `/api/comments/:id`     |                              | 200            | 400          | delete comments                                                |
                                          


<br>

## API's
My Own API!!!! 
<br>

## Packages

<br>


## Links

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/DianaMariaa98/Trail_Project_Client)

[Server repository Link](https://github.com/DianaMariaa98/Trail_Project_Server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) 

### Contributors

Diana Pirlici - [Github](https://github.com/DianaMariaa98) - [Linkedin](https://www.linkedin.com/in/diana-pirlici/)

