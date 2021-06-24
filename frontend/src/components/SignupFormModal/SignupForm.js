import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../css-modules/Signup.module.css'

function SignupForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState([]);

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
    <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Create Account!</h1>
        {errors.length ? 
        <div className={styles.errors}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div> : null
        }
        <div className={styles.inputs}>
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
        <button className={styles.submitBtn} type="submit">Sign Up</button>
        </form>
    </div>
  );
}

export default SignupForm;