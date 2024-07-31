
const API_URL = 'https://tinyurl-n41k.onrender.com'; 
// const API_URL = 'http://localhost:3000'; 

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("response::", response);
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No such user exists');
      }
      throw new Error('Login failed');
    }
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
  } catch (error) {
    console.error('Error while logging innnn:', error);
    throw error;
  }
};



export const register = async (name ,email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email, password }),
    });
    console.log("response::", response);
    if (!response.ok) {
      throw new Error('Register failed');
    }
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
  } catch (error) {
    console.error('Error while Register:', error);
    throw error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching user data:', error);
  }
};
export const getLinkById = async (linkId) => {
  try {
    const token = localStorage.getItem('token');
    console.log("htthththt",linkId);
    const response = await fetch(`${API_URL}/links/${linkId}/clicksInfo`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("resp:",response);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching user data:', error);
  }
}
export const getLinksForUser = async (userId) => {
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users/${userId}/links`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log("resp:",response);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
    }catch(e){
      console.error('Error while fetching user data:', e);
    }
}

export const addLinkForUser = async (originalUrl,userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/links/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ originalUrl, userId }),
    });
    console.log("response::", response);
    if (!response.ok) {
      throw new Error('Failed to add link');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while adding link:', error);
    throw error;
  }
}


