import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Booking from './Booking';

import styles from '../../css-modules/BookingModal.module.css'


const BookingModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id={styles.bookingBtn} className={styles.navLink} onClick={() => setShowModal(true)}>Your Bookings</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Booking setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default BookingModal;