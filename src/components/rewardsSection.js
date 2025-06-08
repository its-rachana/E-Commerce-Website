import React, {useEffect, useState} from 'react'
import {Button, Card, Checkbox, Collapse, Divider, Icon, NumericInput} from "@blueprintjs/core";

const RewardsComponent = ({ redeemPointsCheckBoxEnabled, setRedeemPointsCheckboxEnabled,redeemPointsUserInput, setRedeemPointsUserInput }) => {
    const [isRewardPanelOpen, setIsRewardPanelOpen] = useState(false);
    const [redeemPointsAvailable, setRedeemPointsAvailable] = useState(0);

    useEffect(() => {
        setRedeemPointsAvailable(48327);
    },[])
    const handleRewardPanel = () => {
        setIsRewardPanelOpen(!isRewardPanelOpen);
    }
    const handleEnabledChange = () => {
        setRedeemPointsCheckboxEnabled(!redeemPointsCheckBoxEnabled);
    }
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
    const handleRedeemPoints = () => {
        const newValue = redeemPointsAvailable - redeemPointsUserInput;
        setRedeemPointsAvailable(newValue);
    }

    return (
        <Card style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h6 style={{margin: 0}}>Reward point redemption</h6>
                <Button onClick={() => handleRewardPanel()} icon="chevron-down"/>
            </div>
            <Collapse isOpen={isRewardPanelOpen}>
                <Divider style={{marginLeft: 0, marginRight: 0}}/>
                <p><Icon icon={"clean"}/> Your current reward points balance : {redeemPointsAvailable}</p>
                <Checkbox checked={redeemPointsCheckBoxEnabled}
                          label="Mark this box to redeem points in your current order" onChange={handleEnabledChange}/>
                <p>( Note: Every 1000 points is converted as 1 USD )</p>
                <Collapse isOpen={redeemPointsCheckBoxEnabled}>
                    How many would you like to redeem for this order?
                    <div>
                        <NumericInput onValueChange={(newValue) => setRedeemPointsUserInput(newValue)}/>
                    </div>
                    <button style={buttonStyle} onClick={handleRedeemPoints}>Redeem points</button>
                </Collapse>
            </Collapse>
        </Card>
    )
}

export default RewardsComponent;
