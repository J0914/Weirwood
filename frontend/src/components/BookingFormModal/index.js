import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm';

function BookingFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BookingForm />
        </Modal>
      )}
    </>
  );
}

export default BookingFormModal;