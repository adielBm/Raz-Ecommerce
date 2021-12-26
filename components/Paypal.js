import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from 'react';
import { PAYPAL_CLIENT_ID } from '../utils/constants';
import { useCart } from '../hooks/useCart';

export default function Paypal({onSuccess}) {

  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");
  const { cartItems, total, clearCart, itemCount, delivery } = useCart()

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: total + delivery.attributes.cost,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };


  // handles when a payment is confirmed for paypal
  const onApprove = async (data, actions) => {
    await actions.order.capture().then(function (details) {
      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
    })
    
    console.log('payment is confirmed for paypal 💰✅')
    onSuccess()
  };
  // handles payment errors
  const onError = (data, actions) => {
    setPaypalErrorMessage("Something went wrong with your payment");
  }

  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID.clientId,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  )
}
