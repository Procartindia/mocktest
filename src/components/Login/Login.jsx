// import React, { useState } from 'react';
// import { DEFAULT_CREDENTIALS } from '../../data/constants';
// import './Login.css';

// export const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (username === DEFAULT_CREDENTIALS.admin.username && 
//         password === DEFAULT_CREDENTIALS.admin.password) {
//       onLogin({ type: 'admin', username });
//       return;
//     }

//     const employee = DEFAULT_CREDENTIALS.employees.find(
//       emp => emp.username === username && emp.password === password
//     );

//     if (employee) {
//       onLogin({ type: 'employee', username, name: employee.name });
//       return;
//     }

//     setError('Invalid username or password');
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         <h1 className="login-title">Employee Assessment Portal</h1>
//         <p className="login-subtitle">Please login to continue</p>
        
//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label" htmlFor="username">Username</label>
//             <input
//               id="username"
//               type="text"
//               className="form-input"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               className="form-input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}
          
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { DEFAULT_CREDENTIALS, DOMAINS } from '../../data/constants';
import './Login.css';

export const Login = ({ onLogin, error, candidates = [] }) => {
  const [loginRole, setLoginRole] = useState('employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginRole === 'admin') {
      if (username === DEFAULT_CREDENTIALS.admin.username && 
          password === DEFAULT_CREDENTIALS.admin.password) {
        onLogin({ type: 'admin', username });
        return;
      }

      setLocalError('Invalid admin username or password');
      return;
    }

    if (!selectedDomain) {
      setLocalError('Please select a domain');
      return;
    }
    
    // Check hardcoded employees
    const employee = DEFAULT_CREDENTIALS.employees.find(
      emp =>
        emp.username === username &&
        emp.password === password &&
        (emp.domain || 'General') === selectedDomain
    );

    if (employee) {
      onLogin({
        type: 'employee',
        username,
        password,
        name: employee.name,
        domain: employee.domain || 'General',
        authSource: 'default'
      });
      return;
    }

    // Check Firebase-added candidates
    const firebaseCandidate = candidates.find(
      c =>
        c.username === username &&
        c.password === password &&
        (c.domain || 'General') === selectedDomain
    );

    if (firebaseCandidate) {
      onLogin({
        type: 'employee',
        username,
        password,
        name: firebaseCandidate.name,
        domain: firebaseCandidate.domain || 'General',
        authSource: 'candidate'
      });
      return;
    }

    setLocalError('Invalid username, password, or domain');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src="/logo/spherenex_logo.png" alt="Spherenex Logo" className="login-logo" />
        <h1 className="login-title">Internaship Assessment Portal</h1>
        <p className="login-subtitle">Please login to continue</p>

        <div className="form-group">
          <label className="form-label" htmlFor="login-role">Login As</label>
          <select
            id="login-role"
            className="form-input"
            value={loginRole}
            onChange={(e) => {
              setLoginRole(e.target.value);
              setLocalError('');
            }}
          >
            <option value="employee">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginRole === 'employee' && (
            <div className="form-group">
              <label className="form-label" htmlFor="domain">Domain</label>
              <select
                id="domain"
                className="form-input"
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setLocalError('');
                }}
                required
              >
                <option value="">Select domain</option>
                {DOMAINS.map((domain) => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          )}

          {/* Display either local or app-level error */}
          {(error || localError) && (
            <div className="error-message">
              {error || localError}
            </div>
          )}
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};