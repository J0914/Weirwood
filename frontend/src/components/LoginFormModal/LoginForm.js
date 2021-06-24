import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';

import styles from '../../css-modules/Login.module.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Welcome Back!</h1>
        {errors.length ? 
        <div className={styles.errors}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div> : null
        }
        <div className={styles.inputs}>
            <label>
                Username or Email:
            </label>
            <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        </div>
        <button className={styles.submitBtn} type="submit">Log In</button>
        </form>
    </div>
  );
}

export default LoginForm;