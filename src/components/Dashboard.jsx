import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import ClicksBySourceGraph from './graphs/ClicksBySourceGraph';
// import TotalClicksGraph from './graphs/TotalClicksGraph';
// import ClicksByDayGraph from './graphs/ClicksByDayGraph';
import { getLinksForUser, getUserDetails } from '../services/api';

const Dashboard = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [linksForUser,setLinksForUser] = useState(null);
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
    const fetchLinksForUser = async () => {
      if (userId){
        try{
          const data = await getLinksForUser(userId);
          console.log("links for user", data);
          // console.log("kkkkkkkk",data[0].originalUrl);
          setLinksForUser(data);
        }catch(e){
          console.error('Error while fetching links for user:', e);
        }
      }
    }
    fetchUserDetails();
    fetchLinksForUser();
  }, [userId]);
  // useEffect(()=>{

  // },[])
  const handleLinkClick = (linkId) => {
    navigate('/link/clicks', { state: { linkId } });
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {userDetails ? (
        <div>
          <h2>Welcome, {userDetails.name}</h2>
          <h3>Your Links</h3>
          <ul>
            {linksForUser?.map((link, index) => (
              <li key={index}>
                {index + 1}.    
                {link["originalUrl"]}
                <button type="button" onClick={() => handleLinkClick(link.id)}>datails</button>
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
