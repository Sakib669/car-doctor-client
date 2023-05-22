/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import BookingRow from './BookingRow';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { user } = useContext(AuthContext);
    console.log(user.email);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const url = `https://car-doctor-server-sakib669.vercel.app/bookings?email=${user?.email}`;


    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)        
                }
                else{
                    navigate('/')
                }
            })
    }, [url])

    const handleDelete = (id) => {
        const proceed = confirm('Are you sure you want to delete');
        if(proceed){
            fetch(`https://car-doctor-server-sakib669.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted succesfully');
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })
        }
    }

    const handleBookingConfirm = (id) => {
        fetch(`https://car-doctor-server-sakib669.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // update state
                const remaining = bookings.filter(booking => booking._id !== id);
                const update = bookings.find(booking => booking._id === id);
                update.status = 'confirm';
                const newBookings = [update, ...remaining];
                setBookings(newBookings);
            }
        })
    }

    return (
        <div>
            <h3>your bookings: {bookings.length}</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                
                            </th>
                            <th>Preview Image</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map(booking => 
                                <BookingRow
                                handleBookingConfirm={handleBookingConfirm}
                                handleDelete={handleDelete}
                                booking={booking}
                                key={booking._id}></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;