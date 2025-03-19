"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { AlmaInput } from "@/app/_components/inputs/AlmaInput/AlmaInput";
import { AlmaCheckbox } from "@/app/_components/inputs/AlmaCheckbox/AlmaCheckbox";
import { leadFormData, leadFormSchema } from "@/lib/schemas/leadSchema";
import { FormConfirmationModal } from "./FormConfirmationModal";

import { BsDice5Fill, BsFillHeartFill } from "react-icons/bs";

import styles from "./leadForm.module.css";

type VisaOption = {
  id: string;
  label: string;
};

interface LeadFormClientProps {
  countries: string[];
}

const visaOptions: VisaOption[] = [
  { id: "o-1", label: "O-1" },
  { id: "eb-1a", label: "EB-1A" },
  { id: "eb-2-niw", label: "EB-2 NIW" },
  { id: "unknown", label: "I don't know" },
];

export const LeadFormClient = ({ countries }: LeadFormClientProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<leadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      personal_url: "",
      country: "",
      visa_type: [],
      additional_info: "",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: leadFormData) => {
    setError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create lead");
      }

      reset();
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <AlmaInput
          registration={register("first_name")}
          error={errors.first_name?.message}
          required
          placeholder="First Name"
        />
      </div>
      <div className={styles.formGroup}>
        <AlmaInput
          registration={register("last_name")}
          error={errors.last_name?.message}
          required
          placeholder="Last Name"
        />
      </div>
      <div className={styles.formGroup}>
        <AlmaInput
          registration={register("email")}
          error={errors.email?.message}
          required
          placeholder="Email"
        />
      </div>
      <div className={styles.formGroup}>
        <AlmaInput
          registration={register("personal_url")}
          error={errors.personal_url?.message}
          required
          placeholder="Enter Your LinkedIn / Website URL"
        />
      </div>
      <div className={styles.formGroup}>
        <select
          {...register("country")}
          className={`${styles.input} ${errors.country ? styles.error : ""}`}
        >
          <option value="">Select Country of Residence</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className={styles.errorMessage}>{errors.country.message}</span>
        )}
      </div>
      <div className={styles.checkboxGroup}>
        <div className={styles.FormGroupTitle}>
          <BsDice5Fill color="#9d9af2" size={45} />
          <p className={styles.Title}>Visa categories of interest?</p>
        </div>
        {visaOptions.map((option) => (
          <AlmaCheckbox
            key={option.id}
            option={option}
            error={errors.visa_type?.message}
            registration={register("visa_type")}
          />
        ))}
        {errors.visa_type && (
          <span className={styles.errorMessage}>
            {errors.visa_type.message}
          </span>
        )}
      </div>
      <div className={styles.formGroup}>
        <div className={styles.FormGroupTitle}>
          <BsFillHeartFill color="#9d9af2" size={45} />
          <p className={styles.Title}>How can we help you?</p>
        </div>
        <textarea
          placeholder="Leave your message"
          {...register("additional_info")}
          className={`${styles.textarea} ${
            errors.additional_info ? styles.error : ""
          }`}
        />
      </div>
      <div className={styles.formGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Submit
        </button>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
      <FormConfirmationModal isOpen={isOpen} onClose={closeModal} />
    </form>
  );
};

