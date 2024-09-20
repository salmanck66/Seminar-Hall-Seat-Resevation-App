import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ seatno, date, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Pass name, email, seatno, and date to onSubmit function
    onSubmit(seatno, date, name, email);
    toast.success("Booking successful!");
  };

  return (
    <>
      <form className="flex flex-col flex-start items-start" onSubmit={handleSubmit}>
        <h1 className="text-xl flex items-center justify-center">Book Seat</h1>
        <div className="mt-2">
          <label htmlFor="Name">Name: </label>
          <input
            className="rounded-sm bg-slate-200"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="Email">Email : </label>
          <input
            className="rounded-sm bg-slate-200"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-red-400 w-24 text-white mt-4 rounded-md py-1"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default BookingForm;
