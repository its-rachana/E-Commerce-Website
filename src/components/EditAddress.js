import React, { useState, useEffect } from "react";
import { HTMLSelect, Button, InputGroup } from "@blueprintjs/core";
import countries from "../utils/countries.json";
import countryCodes from "../utils/countryCodes.json";

const EditAddress = ({ onClose, address = {} }) => {
    useEffect(() => {
        console.log(address);
    }, []);
    const [fullName, setFullName] = useState(address.name || "");
    const [selectedCountry, setSelectedCountry] = useState(address.country || "");
    const [selectedState, setSelectedState] = useState(address.state || "");
    const [selectedDialCode, setSelectedDialCode] = useState(() => {
        const match = countryCodes.find(c => address.dialcode?.startsWith(c.dial_code));
        return match ? match.dial_code : "+1";
    });
    const [phoneNumber, setPhoneNumber] = useState(address.phone|| "");
    const [addressLine1, setAddressLine1] = useState(address.addressLine1 || "");
    const [addressLine2, setAddressLine2] = useState(address.addressLine2 || "");
    const [city, setCity] = useState(address.city || "");
    const [zipcode, setZipcode] = useState(address.zipcode || "");

    const states =
        countries.find((c) => c.code2 === selectedCountry)?.states || [];

    // useEffect(() => {
    //     if (selectedCountry && !states.find(s => s.code === selectedState)) {
    //         setSelectedState(""); // Reset state if it doesn't match selected country
    //     }
    // }, [selectedCountry]);
    useEffect(() => {
        if (address.country) {
            const matchedCountry = countries.find(c => c.name === address.country);
            if (matchedCountry) {
                setSelectedCountry(matchedCountry.code2); // set the correct code
                if (address.state) {
                    const matchedState = matchedCountry.states?.find(s => s.name === address.state || s.code === address.state);
                    if (matchedState) {
                        setSelectedState(matchedState.code);
                    }
                }
            }
        }
    }, [address]);

    const handleSave = () => {
        const addressObject = {
            fullName,
            phone: `${selectedDialCode} ${phoneNumber}`,
            country: selectedCountry,
            state: selectedState,
            addressLine1,
            addressLine2,
            city,
            zipcode
        };
        console.log("Saved Address:", JSON.stringify(addressObject, null, 2));
        // You can send addressObject to parent or API
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 8,
                    minWidth: 320,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Edit Address</h3>

                <label>Full Name</label>
                <InputGroup
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fill
                />

                <label>Phone number</label>
                <div style={{ display: "flex", maxWidth: 400, alignItems:"left" }}>
                    <HTMLSelect
                        options={countryCodes.map(c => ({
                            label: `${c.name} (${c.dial_code})`,
                            value: c.dial_code
                        }))}
                        value={selectedDialCode}
                        onChange={(e) => setSelectedDialCode(e.target.value)}
                        style={{ maxWidth: 150, marginRight: 8 }}
                    />
                    <InputGroup
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="tel"
                        style={{ flex: 1 }}
                    />
                </div>

                <label>Country</label>
                <HTMLSelect
                    fill
                    options={[
                        { label: "-- Select Country --", value: "" },
                        ...countries.map((c) => ({ label: c.name, value: c.code2 })),
                    ]}
                    value={selectedCountry}
                    onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState("");
                    }}
                />

                <label>State</label>
                <HTMLSelect
                    fill
                    options={[
                        { label: "-- Select State --", value: "" },
                        ...states.map((s) => ({ label: s.name, value: s.code })),
                    ]}
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={states.length === 0}
                />

                <label>Address line 1</label>
                <InputGroup
                    placeholder="Enter address line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    fill
                />

                <label>Address line 2</label>
                <InputGroup
                    placeholder="Enter address line 2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    fill
                />

                <label>City</label>
                <InputGroup
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fill
                />

                <label>Zipcode</label>
                <InputGroup
                    placeholder="Enter zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    fill
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                    <Button intent="danger" onClick={onClose}>
                        Discard
                    </Button>
                    <Button intent="primary" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditAddress;
