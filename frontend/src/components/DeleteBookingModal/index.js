import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteBooking from './DeleteBooking.js';

import styles from '../../css-modules/Login.module.css'

function DeleteBookingModal ({bookingId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBooking setShowModal={setShowModal} bookingId={bookingId} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBookingModal;