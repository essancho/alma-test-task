import React from "react";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.Hero}>
          <h1>
            Get an assessment <br />
            of your immigration case
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;

