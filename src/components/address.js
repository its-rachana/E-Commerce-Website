import React, {useState} from 'react';
import {Divider, Radio, RadioGroup, Card, Collapse, Pre, Icon, Button} from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';

const AddressComponent = () => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddressPanelOpen,setIsAddressPanelOpen] = useState(false);
    const buttonStyle = {
        backgroundColor: '#000000', // black
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        width: '100%',
        marginTop: '20px',
        transition: 'background-color 0.2s ease',
        opacity: 1,
    };
    const addresses = [
        {
            id: "one",
            name: "Kavya Angara",
            address: "411 Dorsey Ln, Louisville, KY 40223",
            phone: "+12345678900"
        },
        {
            id: "two",
            name: "Ravi Kumar",
            address: "123 Elm St, Phoenix, AZ 85001",
            phone: "+19876543210"
        },
    ];
    const handleAddressPanel = () =>{
        setIsAddressPanelOpen(!isAddressPanelOpen);
    }
    return (
        <Card style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h6 style={{ margin: 0 }}>Select a delivery address</h6>
                <Button onClick={()=>handleAddressPanel()} icon="chevron-down"/>
            </div>
            <Collapse isOpen={isAddressPanelOpen}>
                <Divider style={{marginLeft: 0, marginRight: 0}}/>

                <RadioGroup
                    selectedValue={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                >
                    {addresses.map((addr) => (
                        <div
                            key={addr.id}
                            style={{display: 'flex', alignItems: 'flex-start', marginBottom: 10}}
                        >
                            <Radio value={addr.id} style={{marginTop: 2}}/>
                            <div style={{marginLeft: 8}}>
                                <strong style={{display: 'block', marginBottom: 2}}>{addr.name}</strong>
                                <span style={{fontSize: "smaller"}}>
                {addr.address}
                                    <br/>
                Phone number: {addr.phone}
              </span>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
                <p style={{color: "blue"}}>Add a new delivery address</p>
                <button
                    style={buttonStyle}
                >
                    Deliver to this address
                </button>
            </Collapse>

        </Card>
    );
};

export default AddressComponent;
