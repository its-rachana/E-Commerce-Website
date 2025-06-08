import React, { useState } from "react";
import { Button, Card, Collapse, Divider, Radio, RadioGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

const AddressComponent = ({
                              setEditAddress,
                              selectedAddress,
                              setSelectedAddress,
                              setIsDeliveryAddressSelected,
                              setIsEditAddressPopupOpen,
                          }) => {
    const [isAddressPanelOpen, setIsAddressPanelOpen] = useState(true);
    const [selectedAddressId,setSelectedAddressId] = useState("");
    const addresses = [
        {
            id: "one",
            name: "Kavya Angara",
            addressLine1: "411 Dorsey Ln",
            dialcode:"+1",
            state:"KY",
            code3: "USA",
            phone: "2345678900",
            zipcode:"40223",
            country:"United States",
            addressLine2:"",
            city:"Louisville",
        },
        {
            id: "two",
            name: "Ravi Kumar",
            addressLine1: "123 Elm St",
            dialcode:"+1",
            code3: "USA",
            phone: "9876543210",
            zipcode:"85001",
            country:"United States",
            state: "AZ",
            addressLine2:"",
            city:"Phoenix"
        },
    ];

    const handleDeliveryAddressChange = () => {
        if (selectedAddressId) {
            const selectedAddressObj = addresses.find((addr) => addr.id === selectedAddressId);
            setSelectedAddress(selectedAddressObj)
            setIsDeliveryAddressSelected(true);
        }
    };

    const handleEditAddressFunctionality = (currentAddress) => {
        setEditAddress(currentAddress)
        setIsEditAddressPopupOpen(true);
    };

    return (
        <Card style={{ padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h6>Select a delivery address</h6>
                <Button onClick={() => setIsAddressPanelOpen(!isAddressPanelOpen)} icon="chevron-down" />
            </div>

            <Collapse isOpen={isAddressPanelOpen}>
                <Divider />

                <RadioGroup
                    name="delivery-address-radio-group"
                    selectedValue={selectedAddressId}
                    onChange={(e) => {
                        const id = e.target.value;
                        setSelectedAddressId(id);
                    }}
                >
                {addresses.map((addr) => (
                        <Radio key={addr.id} value={addr.id}>
                            <strong>{addr.name}</strong>
                            <br />
                            {addr.addressLine1}
                            <br />
                            Phone: {addr.countrycode}{addr.phone}
                            <p>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEditAddressFunctionality(addr);
                                    }}
                                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                >
                                    Edit
                                </a>
                            </p>
                        </Radio>
                    ))}
                </RadioGroup>

                <p style={{ color: "blue", cursor: "pointer" }}>Add a new delivery address</p>

                <button
                    style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        padding: "10px",
                        width: "100%",
                        borderRadius: "4px",
                        marginTop: "15px",
                        cursor: "pointer",
                    }}
                    onClick={handleDeliveryAddressChange}
                >
                    Deliver to this address
                </button>
            </Collapse>
        </Card>
    );
};

export default AddressComponent;
