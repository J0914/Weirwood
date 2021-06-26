import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteModal from './DeleteModal.js';

import styles from '../../css-modules/Login.module.css'

function DeleteModalProvider ({reviewId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.navLink} onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteModal setShowModal={setShowModal} reviewId={reviewId} />
        </Modal>
      )}
    </>
  );
}

export default DeleteModalProvider;