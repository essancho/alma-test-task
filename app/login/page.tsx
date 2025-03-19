import { login, signup } from "./actions/actions";
import styles from "./_styles/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome!</h1>
        </div>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              className={styles.input}
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.loginButton} formAction={login}>
              Log in
            </button>
            <button className={styles.signupButton} formAction={signup}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

