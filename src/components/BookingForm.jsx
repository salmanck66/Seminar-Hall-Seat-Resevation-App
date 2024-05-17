import React, { useState } from "react";

const BookingForm = ({ seatno, date, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass name, email, seatno, and date to onSubmit function in the correct order
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
