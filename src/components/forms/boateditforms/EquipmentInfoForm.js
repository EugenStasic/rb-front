import React from 'react';
import { Form, Field } from 'react-final-form';

function EquipmentInfoForm({ onSubmit, initialValues }) {
    const handleFormSubmit = (values) => {
        const selectedEquipment = {
            navigationEquipment: Object.keys(values.navigationEquipment).filter(key => values.navigationEquipment[key]),
            boatEquipment: Object.keys(values.boatEquipment).filter(key => values.boatEquipment[key]),
            waterSportsEquipment: Object.keys(values.waterSportsEquipment).filter(key => values.waterSportsEquipment[key])
        };
        onSubmit(selectedEquipment);
    };

    const createInitialCheckboxValues = (items, initialValues) => {
        return items.reduce((acc, item) => {
            acc[item] = initialValues.includes(item);
            return acc;
        }, {});
    };

    const initialNavigationValues = createInitialCheckboxValues(['Bow thruster', 'Electric windlass', 'Autopilot', 'GPS', 'Depth sounder', 'VHF', 'Guides & Maps'], initialValues.navigationEquipment);
    const initialBoatValues = createInitialCheckboxValues(['Bimini', 'Shower', 'External table', 'External speakers', 'Teak deck', 'Sundeck', 'Bathing Platform', 'Bathing ladder'], initialValues.boatEquipment);
    const initialWaterSportsValues = createInitialCheckboxValues(['Water skis', 'Wakeboard', 'Towable Tube'], initialValues.waterSportsEquipment);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit Equipment Information</h2>
                                <Form
                    initialValues={{
                        navigationEquipment: initialNavigationValues,
                        boatEquipment: initialBoatValues,
                        waterSportsEquipment: initialWaterSportsValues
                    }}
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        {/* NAVIGATION EQUIPMENT */}
                        <div className="mb-3">
                            <label className="form-label">Navigation Equipment</label>
                            {Object.keys(initialNavigationValues).map(item => (
                                <div key={item} className="form-check">
                                    <Field
                                        name={`navigationEquipment.${item}`}
                                        component="input"
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`navigation-${item}`}
                                    />
                                    <label className="form-check-label" htmlFor={`navigation-${item}`}>
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* BOAT EQUIPMENT */}
                        <div className="mb-3">
                            <label className="form-label">Boat Equipment</label>
                            {Object.keys(initialBoatValues).map(item => (
                                <div key={item} className="form-check">
                                    <Field
                                        name={`boatEquipment.${item}`}
                                        component="input"
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`boat-${item}`}
                                    />
                                    <label className="form-check-label" htmlFor={`boat-${item}`}>
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* WATER SPORTS EQUIPMENT */}
                        <div className="mb-3">
                            <label className="form-label">Water Sports Equipment</label>
                            {Object.keys(initialWaterSportsValues).map(item => (
                                <div key={item} className="form-check">
                                    <Field
                                        name={`waterSportsEquipment.${item}`}
                                        component="input"
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`watersports-${item}`}
                                    />
                                    <label className="form-check-label" htmlFor={`watersports-${item}`}>
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" disabled={submitting || pristine}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            />
        </div>
    );
}

export default EquipmentInfoForm;