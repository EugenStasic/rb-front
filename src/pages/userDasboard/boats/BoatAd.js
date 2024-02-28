import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getBoatInfo } from '../../../actions/boatActions';
import BoatHeader from '../../../components/boatad/BoatHeader';
import BoatDetails from '../../../components/boatad/BoatDetails';
import { getPublicUserInfo, getUserInfo } from '../../../actions/userActions';
import BookingForm from '../../../components/forms/booking/BookingForm';
import UserReviews from '../../../components/boatad/UserReviews';
import { fetchReview } from '../../../actions/reviewActions';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./BoatAd.module.css";

const BoatAd = () => {
  const { boatId } = useParams();
  const dispatch = useDispatch();
  const { currentBoat, loading: loadingBoat } = useSelector(
    (state) => state.boat
  );
  const {
    publicProfiles,
    userInfo,
    loading: loadingUser,
  } = useSelector((state) => state.user);
  const { reviews, loading: loadingReviews } = useSelector(
    (state) => state.review
  );
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (boatId) {
      dispatch(getBoatInfo(boatId));
      dispatch(fetchReview(boatId));
    }
  }, [dispatch, boatId]);

  useEffect(() => {
    if (
      currentBoat &&
      currentBoat.ownerId &&
      !publicProfiles[currentBoat.ownerId] &&
      !loadingUser
    ) {
      dispatch(getUserInfo());
      dispatch(getPublicUserInfo(currentBoat.ownerId));
    }
  }, [dispatch, currentBoat, publicProfiles, loadingUser]);

  if (
    loadingBoat ||
    !currentBoat ||
    loadingUser ||
    !userInfo ||
    !publicProfiles[currentBoat?.ownerId] ||
    loadingReviews
  ) {
    return <div>Loading...</div>;
  }

  const ownerData = publicProfiles[currentBoat.ownerId];
  const renterData = userInfo;
  const isOwnerViewing = userInfo?._id === currentBoat?.ownerId;

  return (
    <Container fluid className={styles["boat-ad-container"]}>
      <BoatHeader
        boatData={{
          ...currentBoat.generalInformation,
          images: currentBoat.images,
        }}
      />
      <Row className="boat-ad-main-content">
        <Col lg={8} md={8} className="boat-details-col">
          <BoatDetails
            boatData={{
              ...currentBoat.generalInformation,
              ...currentBoat.technicalInformation,
              ...currentBoat.booking,
              equipment: currentBoat.equipment,
            }}
            ownerData={ownerData || { firstName: "UNKNOWN" }}
          />
          <UserReviews reviews={reviews} boatData={currentBoat} />
        </Col>
        <Col lg={4} md={4} className={styles["booking-form-col"]}>
          {currentBoat &&
            ownerData &&
            renterData &&
            !isOwnerViewing &&
            isAuthenticated && (
              <BookingForm
                boatData={currentBoat}
                ownerData={ownerData}
                renterData={renterData}
              />
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default BoatAd;