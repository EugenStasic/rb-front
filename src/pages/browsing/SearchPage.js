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
        <div className="container-fluid">
            <div className="row">
                <div className="sidebar" style={{ backgroundColor: '#ecf0f1' }}>
                    <FilterBar onFilterChange={handleFilterChange} />
                </div>
                <div className="col-md-9" style={{ paddingLeft: '12vh', paddingTop: '2vh'}}>
                    {loading && <p>Loading boats...</p>}
                    {error && <p>Error loading boats: {error}</p>}
                    <div className="row">
                        {boats && boats.map(boat => (
                            <div key={boat._id} className="col-md-3 mb-3">
                                <BoatCard 
                                    boat={boat} 
                                    imageUrl={`http://localhost:5000/boat/${boat._id}/images/0`|| defaultImage }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;