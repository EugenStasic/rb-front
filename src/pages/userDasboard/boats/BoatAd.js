import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getBoatInfo } from '../../../actions/boatActions';
import BoatHeader from '../../../components/boatad/BoatHeader';
import BoatDetails from '../../../components/boatad/BoatDetails';
import { getPublicUserInfo } from '../../../actions/userActions';

const BoatAd = () => {
    const { boatId } = useParams();
    const dispatch = useDispatch();
    const { currentBoat, loading: loadingBoat } = useSelector(state => state.boat);
    const { publicProfiles, loading: loadingUser } = useSelector(state => state.user);

    useEffect(() => {
        if (boatId) {
            dispatch(getBoatInfo(boatId));
        }
    }, [dispatch, boatId]);

    useEffect(() => {
        if (currentBoat && currentBoat.ownerId && !publicProfiles[currentBoat.ownerId] && !loadingUser) {
            dispatch(getPublicUserInfo(currentBoat.ownerId));
        }
    }, [dispatch, currentBoat, publicProfiles, loadingUser]);

    if (loadingBoat || !currentBoat || loadingUser || !publicProfiles[currentBoat?.ownerId]) {
        return <div>Loading...</div>;
    }

    const ownerData = publicProfiles[currentBoat.ownerId];

    return (
        <div>
            <BoatHeader boatData={currentBoat.generalInformation} />
            <BoatDetails 
              boatData={{
                ...currentBoat.generalInformation,
                ...currentBoat.technicalInformation,
                ...currentBoat.booking,
                equipment: currentBoat.equipment,
              }} 
              ownerData={ownerData || { firstName: 'UNKNOWN' }} 
            />
        </div>
    )
}

export default BoatAd;