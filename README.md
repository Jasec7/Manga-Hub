# 🗡️Manga Hub

## Overview
Manga Hub allows anime and manga fans to browse a list of mangas, view detailed information about each title, and contribute their own content. Users can add new mangas, create chapters, and leave reviews for individual manga titles.

The app includes:
-A manga directory.
-Manga detail pages.
-A review system tied to individual manga titles.
-Smooth navigation with React Router.

## Features
-View all mangas and their details.
-Add mangas, chapters and reviews.
-Delete mangas, chapters, reviews.
-Update reviews.
-3 client-side routes using React Router:
/ 
/mangas
/mangas/:id
-Toggle reviews visibility.
-Sort manga titles (A-Z, Z-A).
-Image support for manga covers.
-Responsive design with basic styling.

## Technologies Used
-React
-React Router
-Formik
-Yup
-CSS
-Python
-Flask
-Flask-RESTful
-SQLAlchemy
-Git & GitHub for version control

## Setup / Installation
git clone git@github.com:Jasec7/Manga-Hub.git
### Backend
1. Navigate to the server directory
2. Install dependencies:
pipenv install
pipenv shell
3. Run the Flask server:
python app.py

### Frontend
1. Navigate to the client directory
2. Install dependencies:
npm install
3. Start the app:
npm start

## API Enpoints
-/mangas
-/mangas/:id
-/reviews
-/chapters
-/mangachapters


## 📝License
This project is licensed under the MIT License.

## Contributors
-Jasec7




