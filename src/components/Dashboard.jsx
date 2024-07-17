import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';
import LinksComponent from './LinksComponent.jsx';
import { getUserDetails } from '../services/api';

const Dashboard = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [showLinks, setShowLinks] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [linksForUser, setLinksForUser] = useState(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const data = await getUserDetails(userId);
          console.log("ddddddddd", data);
          setUserDetails(data);
        } catch (error) {
          console.error('Error while fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleLinks = () => {
    setShowLinks(true);
  };
  return (
    <div>
      {userDetails ? (
        <div className="card text-center">
          <div className="card-header">
            Dashboard
          </div>
          <div className="card-body">
            <h5 className="card-title">Welcome, {userDetails?.name}</h5>
            <p className="card-text">Create shorter URLs with TinyURL.</p>
            {!showLinks && <button className="btn btn-primary" type="button" onClick={() => handleLinks()}>Your Links</button>}
            {showLinks && <LinksComponent />}
          </div>
          <div className="card-footer text-body-secondary">
            learn more
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
