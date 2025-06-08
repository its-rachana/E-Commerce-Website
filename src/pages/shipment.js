import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressComponent from "../components/address";
import {Card, Divider} from "@blueprintjs/core";
import PaymentComponent from "@/components/payment";
import RewardsComponent from "@/components/rewardsSection";
import FormattedDateComponent from "@/utils/formattedDate";
import EditAddress from "@/components/EditAddress";

export default function shipment() {
    const subtotal = 30.00;
    const shipping = 15.00;
    const taxRate = 0.08;
    const [redeemPointsUserInput, setRedeemPointsUserInput] = useState(0);
    const totalBeforeTax = subtotal + shipping - (redeemPointsUserInput / 1000);
    const tax = totalBeforeTax * taxRate;
    const finalAmount = totalBeforeTax + tax;
    const [redeemPointsCheckBoxEnabled, setRedeemPointsCheckboxEnabled] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isDeliveryAddressSelected, setIsDeliveryAddressSelected] = useState(false);
    const [isEditAddressPopupOpen, setIsEditAddressPopupOpen] = useState(false);
    const [editAddress,setEditAddress] = useState("");
    useEffect(() => {
        if (!redeemPointsCheckBoxEnabled) {
            setRedeemPointsUserInput(0)
        }
    });

    return (
        <div className="container mt-4">
            <div className={"row-cols-1"}>
                <h4>Account</h4>
                <h6>Rachana Angara</h6>
                <Divider style={{marginLeft: 0, marginRight: 0}}/>
            </div>
            <div>
                {isEditAddressPopupOpen &&
                    <EditAddress
                        address={editAddress}
                        onClose={() => setIsEditAddressPopupOpen(false)}/>}
            </div>
            <div className={"row"}>
                <div className={"col-4"}>
                    <AddressComponent
                        setEditAddress={setEditAddress}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                        setIsDeliveryAddressSelected={setIsDeliveryAddressSelected}
                        setIsEditAddressPopupOpen={setIsEditAddressPopupOpen}
                    />
                    <RewardsComponent
                        redeemPointsUserInput={redeemPointsUserInput}
                        setRedeemPointsUserInput={setRedeemPointsUserInput}
                        redeemPointsCheckBoxEnabled={redeemPointsCheckBoxEnabled}
                        setRedeemPointsCheckboxEnabled={setRedeemPointsCheckboxEnabled}/>
                    <PaymentComponent/>

                </div>
                <div className={"col-8"}>
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
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p><strong>Subtotal</strong></p>${subtotal}
                        </div>
                        {redeemPointsCheckBoxEnabled &&
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p><strong>Reward points</strong></p>${redeemPointsUserInput / 1000}
                            </div>}
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p><strong>Shipping Fee</strong></p><p>${shipping}</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p><strong>Estimated Tax @ 8%</strong></p><p>${tax}</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p><strong>Order Total</strong></p><p>${finalAmount}</p>
                        </div>
                        <div style={{textAlign: "center", marginTop: "10px"}}>
                            <p>By placing this order you agree to <u>Shopverse's Terms & Condition</u></p>
                        </div>
                        <Divider/>
                        {isDeliveryAddressSelected &&
                            <div>
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
    )
}
