# CarCar

Team:

* Shashwath Nayak - Service
* Marc Rey - Sales

## Design

## Service microservice

1. I built out a Technician model, an Appointment model, and an AutomobileVO model that pulled information from the Autombile model in the inventory API using a poll.git

2. From there, I built out backend functionality for listing technicians and appointments, showing technician and appointment details, creating a technician and/or an appointment, deleting a technician and/or an appointment, and updating a technician and/or appointment using views.

3. I also built out urls using the base http://localhost:8080 for the technicians and appointments to show the different backend functionality from views.

4. After this, I moved to React where I started with building out a ManufacturersList page, a ManufacturersForm page, a ModelsList page, a ModelsForm page, an AutomobilesList page, and an AutomobiliesForm page to pull all information from the inventory API and make it adjustable on the frontend.

5. After building out these pages, I moved onto building out a TechniciansList and a TechniciansForm page to be able to adjust Technician display and creation of Technician data on the front end as well.

6. Moving towards Appointments, I built out an AppointmentsList page that lists out the data from the backend. I utilized the dayjs package to format the date and time on the list, and I utilized backend funcationality for adding buttons to mark the appointments as "finished" or cancelled and disappear from the current list of appointments based off their status. I also added in an isVIP statement to determine if automobiles were purchased or initially from this specific facility based off their vin number.

7. With the creation of appointments, I built out an AppointmentsForm page to be able to create an appointment and assign a specific techician to the appointment on the frontend.

8. Finally for creation of pages, I built out an AppointmentsHistory page that lists ALL appointments no matter their status for being "created", "cancelled", or "finished". This AppointmentsHistory page also has an added filter feature where you can find any specific service appointment based off the car vin.

9. Throughout the project, I utilized App.js and Nav.js to build out the routes for visualization of the built pages. App.js was utlized for the creation of the Routes and urls using the base http://localhost:3000, and I used a nested Route to add a specific routes based off the specific area of focus (whether it was for manufactuerers, vehical models, automobiles, technicians, or appointments) to the base. After this, I built out the Nav.js to create the header for the project that contains all the links that allow you to change pages and access the different pages from navbar with a click of each link.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
