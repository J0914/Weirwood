// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import styles from '../../css-modules/Login.module.css'

function LoginFormModal({showModal, setShowModal, setShowSignupModal}) {

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} setShowSignupModal={setShowSignupModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;