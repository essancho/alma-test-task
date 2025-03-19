import React from "react";

import { AlmaModal } from "@/app/_components/modal/AlmaModal";

import styles from "./leadForm.module.css";
import { BsFillInfoSquareFill } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FormConfirmationModal = ({ isOpen, onClose }: Props) => {
  return (
    <AlmaModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalWindow}>
        <BsFillInfoSquareFill color="#9d9af2" size={45} />
        <h2 className={styles.Title}>Thank You</h2>
        <span>
          Your information was submitted to our team of immigration attorneys.
          Expect an email from <em>hello@tryalma.ai</em>
        </span>
        <button onClick={onClose} className={styles.submitButton}>
          Go Back to Homepage
        </button>
      </div>
    </AlmaModal>
  );
};

