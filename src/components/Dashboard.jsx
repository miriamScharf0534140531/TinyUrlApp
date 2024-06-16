import React, { useEffect, useState } from 'react';
import {Link,useNavigate, useLocation } from 'react-router-dom';
// import ClicksBySourceGraph from './graphs/ClicksBySourceGraph';
// import TotalClicksGraph from './graphs/TotalClicksGraph';
// import ClicksByDayGraph from './graphs/ClicksByDayGraph';
import { getUserDetails } from '../services/api';

const Dashboard = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const data = await getUserDetails(userId);
          console.log("ddddddddd",data);
          setUserDetails(data);
        } catch (error) {
          console.error('Error while fetching user details:', error);
        }
      }
    };
    fetchUserDetails();
  }, [userId]);
 const handleLinkClick = (linkId)=> {
    navigate('/link/clicks', { state: { linkId } });
  }

  return (
    <div>
    <h1>Dashboard</h1>
    {userDetails ? (
      <div>
        <h2>Welcome, {userDetails.name}</h2>
        {/* הצגת הגרפים כאן */}
        <h3>Your Links</h3>
      <ul>
        {userDetails.links.map((link,index) => (
          <li key={link}>
            {/* <Link to={`/link/${link}/clicks`}></Link> */}
            {index + 1}. 
            <button type="button" onClick={()=>handleLinkClick(link)}>datails</button>
          </li>
        ))}
      </ul>
      </div>
    ) : (
      <div>Loading user details...</div>
    )}
  </div>
  );
};

export default Dashboard;
