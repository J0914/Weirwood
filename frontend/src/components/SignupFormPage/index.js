import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import '../../stylesheets/forms.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])

    return dispatch(sessionActions.signUp({ username, email, password, confirmedPassword }))
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        });
    
  }

  return (
    <div className='form-div'>
        <form className='form' onSubmit={handleSubmit}>
        <h1 className='header'>Create Account!</h1>
        {errors.length ? 
        <div className='errors'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div> : null
        }
        <div className='inputs'>
        <label>
                Email:
            </label>
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <label>
                Username:
            </label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            <label>
                Password:
            </label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <label>
                Confirm Password:
            </label>
            <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            />
        </div>
        <button className='submit-btn' type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default SignupFormPage;