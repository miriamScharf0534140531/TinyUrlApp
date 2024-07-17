import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLinksForUser } from '../services/api';
import './LinksComponent.css';
const LinksComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [URL, setURL] = useState("tinyurl-n41k.onrender.com")
  const [linksForUser, setLinksForUser] = useState(null);
  useEffect(() => {
    const fetchLinksForUser = async () => {
      if (userId) {
        try {
          console.log("user id", userId);
          const data = await getLinksForUser(userId);
          console.log("links for user", data);
          // console.log("kkkkkkkk",data[0].originalUrl);
          setLinksForUser(data);
        } catch (e) {
          console.error('Error while fetching links for user:', e);
        }
      }
    }
    fetchLinksForUser()
  }, []);
  const handleLinkClick = (linkId) => {
    navigate('/link/clicks', { state: { linkId } });
  }
  return (
    <>
      <h3>Your Links</h3>
      {linksForUser ? (
        <div>
          {linksForUser?.map((link, index) => (
            <div key={index} className="linkContainer">
              <span className="url">{URL}/{link.id}</span>
              <br />
              <span className="originalUrl">{link.originalUrl}</span>
              <br />
              <button className="button" type="button" onClick={() => handleLinkClick(link.id)}>datails</button>
              <button className='buttonTrash' type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          ))}
        </div>) : (
        <div className="d-flex justify-content-center " style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )}
    </>
  )
}
export default LinksComponent;