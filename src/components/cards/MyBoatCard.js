const MyBoatCard = ({ boat, onEdit, onDelete }) => {

    return (
        <div className="boat-card">
            <h2>{boat.generalInformation.manufacturer} {boat.generalInformation.model}</h2>
            <h3>{boat.technicalInformation.enginePower} HP</h3>
            <button onClick={() => onEdit(boat._id)}>Edit</button>
            <button onClick={() => onDelete(boat._id)}>Delete</button>
        </div>
    );
};

export default MyBoatCard;