Seminar Hall Booking System

A React-based application for booking seats in a seminar hall. This system allows users to select a date and book available seats for that date. Booked seats are highlighted and saved in local storage.
Features

Date Selection: Users can select a date to view and book seats for that specific day.
Seat Booking: Click on a seat to book it. Booked seats are highlighted.
Local Storage: Booked seats are saved in local storage and persist across page reloads.

Technologies Used

React
Moment.js
MUI Date Pickers
Local Storage

Setup

Clone the repository

    git clone https://github.com/your-username/seminar-hall-booking.git
    cd seminar-hall-booking

Install dependencies

    npm run dev

Start the development server

    npm start

Components

SeminarHall.jsx
Handles the main application logic, including date selection and state management for booked seats.

SeatMap.jsx
Displays the seat map and filters booked seats based on the selected date.

Seat.jsx
Represents an individual seat. Handles booking logic and displays a modal for booking details.

BookingForm.jsx
Handles user input for booking a seat.

License

This project is licensed under the MIT License.
Contributions

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.
Contact

For any questions or suggestions, please open an issue or reach out to the project maintainer.
