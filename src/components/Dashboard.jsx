import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LinksComponent from './LinksComponent.jsx';
import { addLinkForUser, getUserDetails } from '../services/api';
import "./DashboardComponent.css"
const Dashboard = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [showLinks, setShowLinks] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [originalUrl, setOriginalURL] = useState('');
  const [shortUrl, setShortUrl] = useState('');
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
  const handleUrlShortening = async () => { 
    /**originalUrl,targetParamName,targetValues,userId */
    //צריך להוסיף לשליחה גם אפשרות של targets
    const data = await addLinkForUser(originalUrl,userId)
    console.log("dataaaaaaaakululululu",data);
    setShortUrl(`tinyurl-n41k.onrender.com/${data.id}`)
  }
  return (
    <div>
      {userDetails ? (
        <div className="card text-center">
          <div className="card-header">
            Dashboard
          </div>
          <div className="card-body">
            <h5 className="card-title ">Welcome, {userDetails?.name}</h5>
            <p className="card-text">Create shorter URLs with TinyURL.</p>



            <div className="card card_Short_URL" >
              <div className="card-body">
                <h5 className="card-title title">Shorten a long URL</h5>
                <input
                  className='input_long_link'
                  type="text"
                  placeholder="Enter long link here"
                  value={originalUrl}
                  onChange={(e) => setOriginalURL(e.target.value)}
                />
                <button className="button button_shorting_URL" type="button" onClick={handleUrlShortening}>
                  Shorten URL
                </button>
                {shortUrl && (//זה אני צריכה לבדוק אם זה עובד
                  <div className="short-url-result">
                    <p className='card-text'>This is your shortened URL: <br/>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                  </div>
                )}
              </div>
            </div>

            {!showLinks && <button className="button" type="button" onClick={() => handleLinks()}>Your Links</button>}
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
