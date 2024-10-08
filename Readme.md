# Offer Informing App
# Author: Sudhi S
# Date: 13-08-2024

The Offer Informing App is a web application that connects customers with businesses by allowing businesses to post offers and functions, and customers to view and claim these offers within a 10km radius. The app includes features such as user authentication, offer posting and viewing, offer claiming, insights/reports for businesses, a polling system, and geolocation-based services.

## Technologies Used
Frontend: React.js, Tailwind CSS, DaisyUI
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
## Features
### Customer Features:

View and claim offers from businesses.
Participate in polls.
Register as a customer.

### Business Features:

Post new offers and manage them.
View insights and reports.
Register as a business.
### Geolocation-based Services:

## Installation and Setup
To install and set up the Offer Informing App, follow these steps:
#### Prerequisites
Ensure you have the following installed:

Node.js
MongoDB 
## Backend Setup
### Clone the Repository

```bash

git clone https://github.com/Sudhi-S-2003/OFFER-INFORMING.git
cd OFFER-INFORMING/backend
```
### Install Dependencies

```bash
npm i
```
## Create a .env File

Copy the .env.example file to .env and update the environment variables with your configuration.

```bash

JWTSECRET=Secert--key
PORT=5000
```
## Start the Backend Server

```bash
npm start
```

## Frontend Setup
Navigate to the Frontend Directory

```bash
cd ../offer-informing-app
npm install
```
## Start the Frontend Server

```bash
npm start
```
The frontend application will be accessible at http://localhost:3000.



