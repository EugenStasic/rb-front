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
        <div>
            <h2>Edit Equipment Information</h2>
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
                        <div>
                            <label>Navigation Equipment</label>
                            {Object.keys(initialNavigationValues).map(item => (
                                <div key={item}>
                                    <label>
                                        <Field
                                            name={`navigationEquipment.${item}`}
                                            component="input"
                                            type="checkbox"
                                        /> {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* BOAT EQUIPMENT */}
                        <div>
                            <label>Boat Equipment</label>
                            {Object.keys(initialBoatValues).map(item => (
                                <div key={item}>
                                    <label>
                                        <Field
                                            name={`boatEquipment.${item}`}
                                            component="input"
                                            type="checkbox"
                                        /> {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* WATER SPORTS EQUIPMENT */}
                        <div>
                            <label>Water Sports Equipment</label>
                            {Object.keys(initialWaterSportsValues).map(item => (
                                <div key={item}>
                                    <label>
                                        <Field
                                            name={`waterSportsEquipment.${item}`}
                                            component="input"
                                            type="checkbox"
                                        /> {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button type="submit" disabled={submitting || pristine}>
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