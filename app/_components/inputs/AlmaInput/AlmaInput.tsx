import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "../styles/inputs.module.css";

interface AlmaInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
}

export const AlmaInput = ({
  type = "text",
  label,
  error,
  required,
  registration,
  className,
  ...props
}: AlmaInputProps) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ""} ${
          className ?? ""
        }`}
        {...props}
        {...registration}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

