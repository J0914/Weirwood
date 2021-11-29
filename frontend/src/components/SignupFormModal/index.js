import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

import styles from '../../css-modules/Signup.module.css'

function SignupFormModal({showModal, setShowModal, setShowLoginModal}) {

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Signup</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm setShowModal={setShowModal} setShowLoginModal={setShowLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;