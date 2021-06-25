import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Booking from './Booking.js';

import styles from '../../css-modules/Booking.module.css'


function BookingModal () {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Your Bookings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking />
        </Modal>
      )}
    </>
  );
}

export default BookingModal;