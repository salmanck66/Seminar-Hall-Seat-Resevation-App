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

    sh

git clone https://github.com/your-username/seminar-hall-booking.git
cd seminar-hall-booking

Install dependencies

sh

npm run dev

Start the development server

sh

    npm start

Components
SeminarHall.jsx

Handles the main application logic, including date selection and state management for booked seats.

jsx

import React, { useState, useEffect } from 'react';
import SeatMap from './SeatMap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const SeminarHall = () => {
    const [bookedSeats, setBookedSeats] = useState(() => {
        const savedBookedSeats = localStorage.getItem("bookedSeats");
        return savedBookedSeats ? JSON.parse(savedBookedSeats) : [];
    });
    const [startDate, setStartDate] = useState(new Date());
    console.log("Date-SeminarHall", startDate);

    useEffect(() => {
        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
    }, [bookedSeats]);

    return (
        <div className='h-screen bg-neutral-100'>
            <h1 className='text-center py-1 pt-6 text-2xl'>Seminar Hall Booking</h1>
            <h1 className='text-center py-1 text-xl'>Select Date</h1>
            <div className='flex justify-center items-center py-4'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker selected={moment(startDate).format("YYYY-MM-DD")} onChange={(date) => setStartDate(date.$d)} />
                </LocalizationProvider>
            </div>
            <SeatMap date={moment(startDate).format("YYYY-MM-DD")} bookedSeats={bookedSeats} setBookedSeats={setBookedSeats} />
        </div>
    );
};

export default SeminarHall;

SeatMap.jsx

Displays the seat map and filters booked seats based on the selected date.

jsx

import React from "react";
import Seat from "./Seat"; 

const SeatMap = ({ date, bookedSeats, setBookedSeats }) => {
  const seats = Array.from({ length: 40 }, (_, i) => ({
    seatno: i + 1,
    isBooked: false,
  }));
  
  const filteredBookedSeats = bookedSeats.filter((seat) => seat.date === date);

  return (
    <div className="flex items-center justify-center text-center pt-15">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
        {seats.map((seat) => (
          <Seat
            key={seat.seatno}
            seatno={seat.seatno}
            date={date}
            setBookedSeats={setBookedSeats}
            bookedSeats={filteredBookedSeats}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatMap;

Seat.jsx

Represents an individual seat. Handles booking logic and displays a modal for booking details.

jsx

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import BookingForm from './BookingForm';

const Seat = ({ seatno, date, bookedSeats, setBookedSeats }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const booked = bookedSeats.some((seat) => seat.seatno === seatno);
    setIsBooked(booked);
  }, [date, bookedSeats, seatno]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const bookSeat = (seatno, date, name, email) => {
    const newBooking = { seatno, date, name, email };
    const updatedBookedSeats = [...bookedSeats, newBooking];
    setBookedSeats((prevBookedSeats) => [...prevBookedSeats, newBooking]);
    localStorage.setItem("bookedSeats", JSON.stringify(updatedBookedSeats));
    setIsBooked(true);
    closeModal();
  };

  return (
    <div className='relative'>
      <div
        onClick={openModal}
        className={`min-h-16 min-w-20 rounded-lg flex items-center justify-center cursor-pointer ${isBooked ? 'bg-red-900' : 'bg-green-500'}`}
      >
        <h1>{seatno}</h1>
      </div>
      {showModal && (
        <div className='fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='backdrop-blur-lg bg-white/30 rounded-xl p-10'>
            <Modal isOpen={showModal} onClose={closeModal}>
              <BookingForm seatno={seatno} date={date} onSubmit={bookSeat} />
              <button onClick={closeModal}>Close</button>
              <div>
                {date && (
                  <h1>Date: {date}</h1>
                )}
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seat;

BookingForm.jsx

Handles user input for booking a seat.

jsx

import React, { useState } from "react";

const BookingForm = ({ seatno, date, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(seatno, date, name, email);
  };

  return (
    <form className="flex flex-col flex-start items-start" onSubmit={handleSubmit}>
      <h1 className="text-xl">Book Seat</h1>
      <div className="mt-2">
        <label htmlFor="Name">Name</label>
        <input
          className="rounded-sm bg-slate-200"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label htmlFor="Email">Email</label>
        <input
          className="rounded-sm bg-slate-200"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-red-400 w-24 text-white mt-4 rounded-md py-1">Submit</button>
    </form>
  );
};

export default BookingForm;

Modal.jsx

A simple modal component for displaying forms and messages.

jsx

import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl">
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

License

This project is licensed under the MIT License.
Contributions

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.
Contact

For any questions or suggestions, please open an issue or reach out to the project maintainer.
