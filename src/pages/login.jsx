import React, { useState } from 'react';

const Login = () => {
  const [alertData, setAlertData] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDataFetched, setIsDataFetched] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      console.log(data);
      const user = data.results.find((result) => result.name === username);
      if (user && user.birth_year === password) {
        setIsDataFetched(true);
      } else if (username === '' || password === '') {
        setAlertData('Please enter username and password');
      } else {
        setAlertData('Username or password is incorrect');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (isDataFetched) {
    window.location.href = '/planets';
    return null;
  }

  return (
    <div className="flex-container">
      <p style={{ color: 'red' }}>{alertData}</p>
      <div className="flex">
        <label className="label-login" htmlFor="username">
          Name
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          required
        />
      </div>
      <br />
      <div className="flex">
        <label className="label-password" htmlFor="password">
          Password{' '}
        </label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      <br />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
