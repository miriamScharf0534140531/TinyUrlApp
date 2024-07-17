import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { getLinksForUser } from '../services/api';
const LinksComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state || {};
    const [URL, setURL] = useState("https://tinyurl-n41k.onrender.com")
    const [linksForUser, setLinksForUser] = useState(null);
    useEffect(() => {
    const fetchLinksForUser = async () => {
        if(userId){
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
},[]);
      const handleLinkClick = (linkId) => {
        navigate('/link/clicks', { state: { linkId } });
      }
    return(
        <>
         <h3>Your Links</h3>
          <ul>
            {linksForUser?.map((link, index) => (
              <li key={index}>
                {URL}/{link.id}
                <br />
                {link.originalUrl}
                <br/>
                <button type="button" onClick={() => handleLinkClick(link.id)}>datails</button>
              </li>
            ))}
          </ul>
        </>
    )
}
export default LinksComponent;