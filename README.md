Learning Goals Tracker:

A full-stack web app to help users track personal learning goals within a group setting. Users can join groups, set and track their goals.

-------------------------------------------------------------------------

Features:

User registration and login (with JWT auth)
Group-based goal tracking
Add, view, and delete learning goals
Progress tracking with deadlines

--- Built with React (Vite), TypeScript, Tailwind CSS, Express, and PostgreSQL

-------------------------------------------------------------------------

Below are the api endpoints for the application use

| Endpoint                 | Method | Description             |
| ------------------------ | ------ | ----------------------- |
| `/api/login`             | POST   | Login user              |
| `/api/register`          | POST   | Register and join group |
| `/api/groups/getAll`     | GET    | List all groups         |
| `/api/goals/user/getAll` | GET    | Get user's goals        |
| `/api/goals/add`         | POST   | Add new goal            |
| `/api/goals/delete/:id`  | DELETE | Delete goal by ID       |


-------------------------------------------------------------------------

Envevironmental Variabls:

PORT = 5000
DB_HOST = localhost
DB_PORT = 5432
DB_USER = XXXXXX
DB_PASSWORD = XXXXXXXX
DB_NAME = XXXXXX
JWT_SECRET = XXXXXXXXX

---------------------- API Documnetation: -------------------------------


POST /api/login – used for user login. 

Request: 
{ "username": "alice", "password": "secret" }. 

Response 
(200): { "token": "JWT_TOKEN", "group_name": "Frontend Enthusiasts" }

 or 

(202): { "message": "User not in group" }.

-------------------------------------------------------------------------

POST /api/register – used for user registration and joining a group.
Request: 
{ "username": "SriRama", "password": "sita", "group_name": "Backend Masters" }.

Response 
(201): { "message": "User registered", "token": "JWT_TOKEN", "group_name": "Backend Masters" }.

-------------------------------------------------------------------------

GET /api/groups/getAll – used to fetch all available group names.

Response 
(200): [ { "id": "uuid", "name": "Frontend Enthusiasts" }, ... ].

-------------------------------------------------------------------------

GET /api/goals/user/getAll – used to fetch all goals for the logged-in user. 

Requires Authorization: Bearer TOKEN header. 

Response 
(200): [ { "id": "uuid", "title": "Goal", "progress": 45, "deadline": "ISO_DATE", "username": "bob", "group_id": "uuid", "created_at": "ISO_DATE" }, ... ].

-------------------------------------------------------------------------

POST /api/goals/add – used to add a new goal. 

Requires Authorization: Bearer TOKEN. 

Request: { "title": "Learn SQL", "progress": 100, "deadline": "3/12/22" }. 

Response 
(201): { "message": "Goal added", "goal": { ...goalObject } }.

-------------------------------------------------------------------------

DELETE /api/goals/delete/:goalId – used to delete a goal by ID. 

Requires Authorization: Bearer TOKEN. 

Response 
(200): { "message": "Goal deleted successfully" }.