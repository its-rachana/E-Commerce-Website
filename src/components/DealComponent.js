import React, {useState} from 'react'
import {Button, Card, Collapse, Divider, InputGroup} from "@blueprintjs/core";
import {clearAllCartItems, retrievePromoCode} from "@/services/triggerAPI";

const DealGiftCards = ({setGiftCardAmount,setPromoCodeAmount,isGiftCardRedeemed, setIsGiftCardRedeemed,setIsPromoCodeApplied,isPromoCodeApplied}) => {
    const [isDealGiftCardPanelOpen, setIsDealGiftCardPanelOpen] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [giftCard, setGiftCard] = useState("");

    const handleRewardPanel = () => {
        setIsDealGiftCardPanelOpen(!isDealGiftCardPanelOpen)
    }
    const handlePromoCodeApply = () => {
        const retrievePC = async() =>{
            await retrievePromoCode();
        }
        setIsPromoCodeApplied(true);
        retrievePC().then(
            setIsPromoCodeApplied(true),
            setPromoCodeAmount(10)
        );
    };
    const handleRedeemGiftCard = () => {
        console.log("Redeemed a gift card")
        const retrieveGC = async() =>{
            await retrievePromoCode();
        }
        setIsGiftCardRedeemed(true);
        retrieveGC().then(
            setIsGiftCardRedeemed(true),
            setGiftCardAmount(20)
        );
    };

    return (
        <Card style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h6 style={{margin: 0}}>Deals & gift cards</h6>
                <Button onClick={() => handleRewardPanel()} icon="chevron-down"/>
            </div>
            <Collapse isOpen={isDealGiftCardPanelOpen}>
                <Divider style={{marginLeft: 0, marginRight: 0}}/>
                <div style={{marginBottom: "5px"}}>
                    <p><strong>Add Promo Codes</strong></p>
                    <InputGroup
                        placeholder="Enter Promo Code"
                        value={promoCode}
                        onChange={(e) => {
                            setPromoCode(e.target.value);
                            setIsPromoCodeApplied(false);
                        }}
                        rightElement={
                            <div style={{display: "flex", gap: "4px", alignItems: "center"}}>
                                <Button
                                    intent="primary"
                                    text="Apply"
                                    onClick={handlePromoCodeApply}
                                    style={{
                                        height: "100%",
                                        backgroundColor: "black",
                                        color: "white"
                                    }}
                                />
                                {promoCode && (
                                    <Button
                                        icon="cross"
                                        onClick={() => {
                                            setPromoCode("");
                                            setIsPromoCodeApplied(false);
                                        }}
                                    />
                                )}
                            </div>
                        }
                    />
                    {isPromoCodeApplied && (
                        <p style={{color: "green", marginTop: "4px"}}>
                            Promo code applied successfully!
                        </p>
                    )}
                </div>


                <div style={{marginBottom: "5px"}}>
                    <p><strong>Redeem Gift Card</strong></p>
                    <InputGroup
                        placeholder="Enter Promo Code"
                        value={giftCard}
                        onChange={(e) => {
                            setGiftCard(e.target.value);
                            setIsGiftCardRedeemed(false);
                        }}
                        rightElement={
                            <div style={{display: "flex", gap: "4px", alignItems: "center"}}>
                                <Button
                                    intent="primary"
                                    text="Apply"
                                    onClick={handleRedeemGiftCard}
                                    style={{
                                        height: "100%",
                                        backgroundColor: "black",
                                        color: "white"
                                    }}
                                />
                                {giftCard && (
                                    <Button
                                        minimal
                                        icon="cross"
                                        onClick={() => {
                                            setGiftCard("");
                                            setIsGiftCardRedeemed(false);
                                        }}
                                    />
                                )}
                            </div>
                        }
                    />
                    {isGiftCardRedeemed && (
                        <p style={{color: "green", marginTop: "4px"}}>
                            Gift card redeemed successfully!
                        </p>
                    )}
                </div>

            </Collapse>
        </Card>
    )
}

export default DealGiftCards;
