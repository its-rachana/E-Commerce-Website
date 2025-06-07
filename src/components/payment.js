// pages/_app.js or a custom wrapper component
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "@/components/checkoutForm";
import React, {useEffect, useState} from "react";
import {retrieveSecretKeyFromBackend} from "@/services/triggerAPI";
import {Button, Card, Collapse} from "@blueprintjs/core";

const stripePromise = loadStripe('pk_live_51RX8au05e99jRibGEnhOBkJEx2I949dRSLRMrG1IvZnwCXD5CzsS136GSPWKnBGTWd0DmPnbtjPjsaPaA5lxFJVG00GrO9bvjL'); // Replace with your real public key
export default function PaymentComponent({Component, pageProps}) {
    const [clientSecret, setClientSecret] = useState("");
    const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);

    useEffect(() => {
        const retrieve = async () => {
            const key = await retrieveSecretKeyFromBackend();
            setClientSecret(key.clientSecret);
        }
        retrieve();
    }, []);

    const options = {
        clientSecret
    };
    const handlePaymentPanel = () => {
        setIsPaymentPanelOpen(!isPaymentPanelOpen);
    }
    return (
        clientSecret && (
            <Card style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h6 style={{margin: 0}}>Select payment method</h6>
                    <Button onClick={() => handlePaymentPanel()} icon="chevron-down"/>
                </div>
                <Collapse isOpen={isPaymentPanelOpen}>
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm/>
                    </Elements>
                </Collapse>

            </Card>

        ));
}
