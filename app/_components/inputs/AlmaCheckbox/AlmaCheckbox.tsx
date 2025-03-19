import React, { InputHTMLAttributes } from "react";
import styles from "../styles/inputs.module.css";
import { UseFormRegisterReturn } from "react-hook-form";

type VisaOption = {
  id: string;
  label: string;
};

interface AlmaCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  option: VisaOption;
  error?: string;
  registration: UseFormRegisterReturn;
}

export const AlmaCheckbox = ({
  option,
  error,
  registration,
}: AlmaCheckboxProps) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        value={option.id}
        type="checkbox"
        {...registration}
        className={`${styles.visaStatus} ${error ? styles.error : ""}`}
      />
      {option.label}
    </label>
  );
};

