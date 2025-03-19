import { getNames } from "country-list";
import { LeadFormClient } from "./LeadFormClient";
import styles from "./leadForm.module.css";
import { BsFillInfoSquareFill } from "react-icons/bs";

const LeadForm = () => {
  const countries: string[] = getNames();

  return (
    <div className={styles.container}>
      <div className={styles.LeadForm}>
        <BsFillInfoSquareFill color="#9d9af2" size={45} />
        <h2 className={styles.Title}>Want to understand your Visa options?</h2>
        <span className={styles.Desc}>
          Submit the form below and our team of experienced attorneys will
          review your information and send a prelimary assessement of your case
          based on your goals.
        </span>
        <LeadFormClient countries={countries} />
      </div>
    </div>
  );
};

export default LeadForm;

