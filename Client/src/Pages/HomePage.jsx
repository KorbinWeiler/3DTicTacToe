import React, { useEffect, useState, useContext } from 'react';
import '../Styles/HomePage.css';
import {UserContext} from '../App';

const HomePage = () => {
  const [user, setUser] = useState(null);

  const { Token } = useContext(UserContext);
  const [token, setToken] = Token;
  
//   useEffect(() => {
//     // Mock user info fetch
//     const storedUser = {
//       name: 'Jane Doe',
//       email: 'jane.doe@example.com',
//       role: 'Frontend Developer',
//     };

//     setUser(storedUser);
//   }, []);

  return (
    <div className="home-container">
      <header className="header">
        <h1>Welcome</h1>
      </header>

      {token ? (
        <div className="user-card">
          <h2>{token ? token : "null"}</h2>
          {/* <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p> */}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default HomePage;