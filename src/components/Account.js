import React, { useState, useEffect } from 'react';
import { api } from "../utils/Main";

const Account = ({ session }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (session && session.user && session.user.id) {
          const response = await api.get(`/users/${session.user.id}`);
          if (response.data && response.data.status === "success") {
            setUserDetails(response.data.user);
          } else {
            setErrorMessage('User not found. Please try again later.');
          }
        } else {
          setErrorMessage('Invalid session data. Please try again later.');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error fetching user details:', error.response.data);
          setErrorMessage('Error fetching user details. Please try again later.');
        } else if (error.request) {
          console.error('Error fetching user details:', error.request);
          setErrorMessage('Unable to connect to the server. Please check your internet connection.');
        } else {
          console.error('Error fetching user details:', error.message);
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    };

    fetchUserDetails();
  }, [session]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Account</h2>
      <p>Name: {userDetails.first_name} {userDetails.last_name}</p>
      <p>Role: {userDetails.role}</p>
      <p>Phone-Number: {userDetails.phone_number}</p>
      <p>Email: {userDetails.email}</p>
    </div>
  );
};

export default Account;
