import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ModalReviewForm from './ModalReviewForm';

import styles from '../../css-modules/Login.module.css'

function ReviewFormModal({reviewId, body}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalReviewForm setShowModal={setShowModal}reviewId={reviewId} reviewBody={body} />
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;