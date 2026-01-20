# 🗡️Manga Hub

### 🌐 Live Links:
* Frontend (React): https://manga-hub-frontend.onrender.com
* Backend (Flask API) https://manga-hub-555n.onrender.com/mangas

## Overview
Manga Hub allows manga fans to browse a list of mangas, view detailed information about each title, and contribute their own content. Users can add new mangas, create chapters, and leave reviews for individual manga titles.

The app includes:
* A manga directory.
* Manga detail pages.
* A review system tied to individual manga titles.
* Smooth navigation with React Router.

## Features
* View all mangas and their details.
* Add mangas, chapters and reviews.
* Delete mangas, chapters, reviews.
* Update reviews.
* 3 client-side routes using React Router:
/ 
/mangas
/mangas/:id
* Toggle reviews visibility.
* Sort manga titles (A-Z, Z-A).
* Image support for manga covers.
* Responsive design with basic styling.

## Technologies Used
* React
* React Router
* Formik
* Yup
* CSS
* Python
* Flask
* Flask-RESTful
* SQLAlchemy
* PostgreSQL
* Render
* Git & GitHub for version control

## Setup / Installation
git clone git@github.com:Jasec7/Manga-Hub.git
### Backend
1. Navigate to the server directory
2. Install dependencies:
pipenv install
pipenv shell
3. Run the Flask server:
python app.py
(uses SQLite for local development)

### Frontend
1. Navigate to the client directory
2. Install dependencies:
npm install
3. Start the app:
npm start

## API Endpoints
* /mangas
* /mangas/:id
* /reviews
* /chapters
* /mangachapters (manga–chapter relationships)

## 🚀 Deployment
This application is fully deployed using Render.
* Backend (Flask API) is deployed as a Render Web Service.
* Database is PostgreSQL, hosted on Render.
* Frontend (React) is deployed as a Render Static Site.

The frontend communicates with the deployed backend via HTTP requests to the live API.

For development and presentation purposes, the application can also be run locally using:

* python app.py for the backend
* npm start for the frontend

Environment variables are used to differentiate between local and production configurations.


## 📝License
This project is licensed under the MIT License.

## Contributors
* Jasec7




