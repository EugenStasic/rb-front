const MyBoatCard = ({ boat, onEdit, onDelete }) => {

    return (
        <div className="boat-card">
            <h2>{boat.manufacturer} {boat.model}</h2>
            <h3>{boat.engine.power} HP</h3>
            <button onClick={() => onEdit(boat._id)}>Edit</button>
            <button onClick={() => onDelete(boat._id)}>Delete</button>
        </div>
    );
};

export default MyBoatCard;