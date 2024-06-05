import React, { useState, useEffect } from 'react';
import SeatMap from './SeatMap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import dayjs from 'dayjs'


const SeminarHall = () => {
    const [bookedSeats, setBookedSeats] = useState(() => {
        // Retrieve bookedSeats from localStorage
        const savedBookedSeats = localStorage.getItem("bookedSeats");
        return savedBookedSeats ? JSON.parse(savedBookedSeats) : [];
      });
      const [startDate, setStartDate] = useState(new Date());
      console.log("Date-SeminarHall",startDate)

      useEffect(() => {
        // Save bookedSeats to localStorage whenever it changes
        localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
      }, [bookedSeats]);
    

    return (
        <div className='h-screen bg-green-200'>
            <h1 className='text-center py-1  pt-12 text-2xl'>Seminar Hall Booking</h1>
            <h1 className='text-center py-1 text-xl'>Select Date</h1>
            <div className='flex justify-center items-center py-5 lg:py-14'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker minDate={dayjs(new Date())} defaultValue={dayjs(new Date())}  selected={moment(startDate).format("YYYY-MM-DD")} onChange={(date) => setStartDate(date.$d)} />
                </LocalizationProvider>
            </div>
            <SeatMap date={moment(startDate).format("YYYY-MM-DD")} bookedSeats={bookedSeats} setBookedSeats={setBookedSeats} />
        </div>
    );
};

export default SeminarHall;
