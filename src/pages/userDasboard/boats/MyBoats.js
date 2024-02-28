import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoatListing } from '../../../actions/boatActions';
import MyBoatCard from '../../../components/cards/MyBoatCard';
import { useNavigate } from 'react-router';
import ProfileSidebar from '../../../components/common/ProfileSideBar';
import { Container, Row, Col } from 'react-bootstrap';

const MyBoats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { boats, loading } = useSelector(state => state.boat);

    if (loading) return <div>Loading...</div>;

    const handleEdit = (boatId) => {
        navigate(`/edit-boat/${boatId}`);
    };

    const handleDelete = (boatId) => {
        dispatch(deleteBoatListing(boatId));
    };

    const textStyle = {
      fontFamily: '"Source Sans Pro", sans-serif',
      color: "#34495e",
      fontWeight: "bold",
    };

    return (
      <Container fluid>
        <Row>
          <ProfileSidebar />
          <Col md={9} lg={10} style={{ paddingLeft: "12vh" }}>
            <h1 className="mb-3" style={textStyle}>
              My Boats
            </h1>
            <div className="d-flex mb-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/registerboat")}
              >
                Add New Boat
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate("/my-boat-bookings")}
              >
                My Boat Bookings
              </button>
            </div>
            <div className="row">
              {boats.map((boat) => (
                <div key={boat._id} className="col-lg-3 col-md-3 mb-4">
                  <MyBoatCard
                    boat={boat}
                    onEdit={() => handleEdit(boat._id)}
                    onDelete={() => handleDelete(boat._id)}
                    imageUrl={`http://localhost:5000/boat/${boat._id}/images/0`}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
};

export default MyBoats;