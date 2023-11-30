import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoatCard from '../../components/cards/BoatCard';
import FilterBar from '../../components/common/FilterBar';
import { fetchBoats } from '../../actions/searchActions';
import defaultImage from '../../assets/images/MissingImage.PNG';

const SearchPage = () => {
    const dispatch = useDispatch();
    const { items: boats, loading, error } = useSelector(state => state.search);

    useEffect(() => {
        dispatch(fetchBoats({}));
    }, [dispatch]);

    const handleFilterChange = (filters) => {
        dispatch(fetchBoats(filters));
    };

    return (
        <div>
            <FilterBar onFilterChange={handleFilterChange} />
            {loading && <p>Loading boats...</p>}
            {error && <p>Error loading boats: {error}</p>}
            <div className="boat-cards-container">
                {boats && boats.map(boat => (
                    <BoatCard 
                        key={boat._id} 
                        boat={boat} 
                        imageUrl={`http://localhost:5000/boat/${boat._id}/images/0`|| defaultImage }
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;