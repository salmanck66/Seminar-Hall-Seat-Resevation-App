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
