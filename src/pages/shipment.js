import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressComponent from "../components/address";
import {Card, Divider, Menu, MenuItem, Navbar, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import PaymentComponent from "@/components/payment";
import RewardsComponent from "@/components/rewardsSection";
import FormattedDateComponent from "@/utils/formattedDate";
import EditAddress from "@/components/EditAddress";
import DealComponent from "@/components/DealComponent";
import {fetchAllCartItems} from "@/services/triggerAPI";
import Header from "@/components/header";

export default function shipment() {
    /*
    1.User addresses
    2.Redeem points available
    * */

    const shipping = 15.00;
    const taxRate = 0.08;
    const [subtotal, setSubtotal] = useState(0);
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        //fetch the cart items
        const fetchAllCart = async () => {
            const data = await fetchAllCartItems()
            data.map((item, index) => {
                console.log(item["product"])
            })
            setCartItems(data);
        }
        //fetchAllCart();
        const obj = [
            {"Title": "T-Shirt", "Variant Price": "$20"},
            {"Title": "Hoodie", "Variant Price": "$35"},
            {"Title": "Cap", "Variant Price": "$10"},
            {"Title": "Jacket", "Variant Price": "$50"},
            {"Title": "Socks", "Variant Price": "$5"}
        ]
        setCartItems(obj)
        setSubtotal(
            obj.reduce((acc, item) => {
                const price = parseFloat(item["Variant Price"].replace("$", ""));
                return acc + price;
            }, 0)
        );

    }, [])

    const [redeemPointsUserInput, setRedeemPointsUserInput] = useState(0);
    const [redeemPointsCheckBoxEnabled, setRedeemPointsCheckboxEnabled] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isDeliveryAddressSelected, setIsDeliveryAddressSelected] = useState(false);
    const [isEditAddressPopupOpen, setIsEditAddressPopupOpen] = useState(false);
    const [editAddress, setEditAddress] = useState("");
    const totalBeforeTax = subtotal + shipping;
    const tax = totalBeforeTax * taxRate;
    const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
    const [promoCodeAmount, setPromoCodeAmount] = useState(0);
    const [isGiftCardRedeemed, setIsGiftCardRedeemed] = useState(false);
    const [giftCardAmount, setGiftCardAmount] = useState(0);

    const finalAmount = (totalBeforeTax + tax) - giftCardAmount - promoCodeAmount - (redeemPointsUserInput / 1000);

    useEffect(() => {
        if (!redeemPointsCheckBoxEnabled) {
            setRedeemPointsUserInput(0)
        }
    });

    return (
        <div>
            <Header/>
            <div className="container mt-4">
                <div>
                    {isEditAddressPopupOpen && <EditAddress
                        address={editAddress}
                        onClose={() => setIsEditAddressPopupOpen(false)}/>}
                </div>
                <div className={"row"}>
                    <div className={"col-5"}>
                        <AddressComponent
                            setEditAddress={setEditAddress}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            setIsDeliveryAddressSelected={setIsDeliveryAddressSelected}
                            setIsEditAddressPopupOpen={setIsEditAddressPopupOpen}
                        />
                        <RewardsComponent
                            finalAmount={finalAmount}
                            redeemPointsUserInput={redeemPointsUserInput}
                            setRedeemPointsUserInput={setRedeemPointsUserInput}
                            redeemPointsCheckBoxEnabled={redeemPointsCheckBoxEnabled}
                            setRedeemPointsCheckboxEnabled={setRedeemPointsCheckboxEnabled}/>
                        <DealComponent
                            setGiftCardAmount={setGiftCardAmount}
                            setPromoCodeAmount={setPromoCodeAmount}
                            setIsGiftCardRedeemed={setIsGiftCardRedeemed}
                            isGiftCardRedeemed={isGiftCardRedeemed}
                            isPromoCodeApplied={isPromoCodeApplied}
                            setIsPromoCodeApplied={setIsPromoCodeApplied}/>
                        <PaymentComponent/>
                    </div>
                    <div className={"col-7"}>
                        <Card>
                            <h5>Order summary</h5>
                            <Divider style={{marginLeft: 0, marginRight: 0}}/>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p>Date</p>
                                <FormattedDateComponent/>
                            </div>
                            <Divider style={{marginLeft: 0, marginRight: 0}}/>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Products</strong></p>
                            </div>
                            <div>
                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        <span>{item["Title"]}</span>
                                        <span>{item["Variant Price"]}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Subtotal</strong></p>${subtotal}
                            </div>

                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Shipping Fee</strong></p><p>${shipping}</p>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Estimated Tax @ 8%</strong></p><p>${tax}</p>
                            </div>
                            {redeemPointsCheckBoxEnabled &&
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <p><strong>Reward points</strong></p>
                                    <span style={{color: "green"}}>
                                    -${redeemPointsUserInput / 1000}
                                </span>
                                </div>}
                            {isPromoCodeApplied &&
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <p><strong>Promo Code</strong></p>
                                    <span style={{color: "green"}}>
                                    -${promoCodeAmount}
                                </span>
                                </div>}
                            {isGiftCardRedeemed &&
                                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <p><strong>Gift Card Redeemed</strong></p>
                                    <span style={{color: "green"}}>
                                    -${giftCardAmount}
                                </span>
                                </div>}
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Order Total</strong></p><p>${finalAmount}</p>
                            </div>
                            <div style={{textAlign: "center", marginTop: "10px"}}>
                                <p>By placing this order you agree to <u>Shopverse's Terms & Condition</u></p>
                            </div>
                            <Divider/>
                            {isDeliveryAddressSelected && <div>
                                <h6><strong>Delivery Address</strong></h6>
                                <p><strong>Name - </strong>{selectedAddress.name}</p>
                                <p><strong>Address - </strong>{selectedAddress.addressLine1}</p>
                                <p><strong>Phone number - </strong>{selectedAddress.phone}</p>
                                <p>Your tracking order id - <strong>#7348261</strong></p>
                                <p>Your order will arrive in approximately 7–10 working days.</p>
                            </div>}
                        </Card>
                    </div>
                </div>
            </div>
        </div>)
}
