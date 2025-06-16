import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/checkout-success",
            },
        });

        if (error) setMessage(error.message);

        setIsLoading(false);
    };

    const buttonStyle = {
        backgroundColor: '#000000',
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
        opacity: isLoading || !stripe || !elements ? 0.6 : 1,
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <PaymentElement />
            <button
                style={buttonStyle}
            >
                {isLoading ? "Processing…" : "Pay"}
            </button>
            {message && <div style={{ marginTop: '15px', color: 'red' }}>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
