import React from "react";
import Seat from "./Seats"; // Import the Seat component

const SeatMap = ({ date, bookedSeats, setBookedSeats }) => {
  const seats = Array.from({ length: 40 }, (_, i) => ({
    seatno: i + 1,
    isBooked: false,
  }));
  console.log("Date-SeatMap",date)
  const filteredBookedSeats = bookedSeats.filter((seat) => seat.date === date);
  console.log("filtered",filteredBookedSeats)

  return (
    <div className="flex items-center mx-3 mb-10 justify-center text-center pt-15">
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
