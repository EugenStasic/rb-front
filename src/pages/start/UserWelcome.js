import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../../services/users/userService';
import styles from "./UserWelcome.module.css";

function UserWelcome() {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setFirstName(userDetails.firstName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Logging in...</div>;
  }

  return (
    <div className={styles.userWelcomeBackground}>
      <div className={styles.userWelcomeContainer}>
        <div className={styles.userWelcomeTextOverlay}>
          <h1 className={styles.userWelcomeDisplay4}>
            Welcome back, {firstName}!
          </h1>
          <p className={styles.userWelcomeLead}>
            Ready for your next adventure?
          </p>
          <hr className={styles.userWelcomeHr} />
          <div className="my-4">
            <a
              href="/search"
              className={`${styles.userWelcomeBtnPrimary} mr-2`}
            >
              Find a Boat
            </a>
            <a href="/my-bookings" className={styles.userWelcomeBtnSecondary}>
              My Bookings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWelcome;