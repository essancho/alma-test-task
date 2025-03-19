"use client";

import { useRouter } from "next/navigation";
import styles from "./authButton.module.css";
import { IoLogInSharp } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";

interface AuthButtonProps {
  isLoggedIn: boolean;
}

export default function AuthButton({ isLoggedIn }: AuthButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (isLoggedIn) {
      router.push("/admin/leads");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      className={`${styles.floatingButton} ${
        isLoggedIn ? styles.loggedIn : ""
      }`}
      onClick={handleClick}
    >
      {isLoggedIn ? (
        <>
          Check Leads
          <SlPeople size={45} />
        </>
      ) : (
        <>
          Login
          <IoLogInSharp size={45} />
        </>
      )}
    </button>
  );
}

