import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm';

import styles from '../../css-modules/Booking.module.css'


function BookingFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id={styles.bookingBtn} className={styles.navLink} onClick={() => setShowModal(true)}>Book a Stay!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default BookingFormModal;