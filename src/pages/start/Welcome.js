import React from 'react';
import styles from "./Welcome.module.css";

function Welcome() {
  return (
    <div className={styles.welcomeBackground}>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeTextOverlay}>
          <h1 className={styles.welcomeDisplay4}>Welcome To Rent a Boat!</h1>
          <p className={styles.welcomeLead}>
            Discover the best boats near you.
          </p>
          <hr className={styles.welcomeHr} />
          <p>Join us and start your adventure on the water today!</p>
          <div>
            <a
              className={`${styles.welcomeBtnPrimary} btn-lg`}
              href="/register"
              role="button"
            >
              Sign Up Now
            </a>
            <a
              className={`${styles.welcomeBtnSecondary} btn-lg`}
              href="/search"
              role="button"
            >
              Check Out Boat Selection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;