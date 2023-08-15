{/*import React from 'react';
import { Button } from "react-native-elements"
import { View } from 'react-native'
import * as PaymentIntetnService from '../../utils/PaymentIntentService'
import Globals from "../../utils/Globals";
import { StripeProvider } from '@stripe/stripe-react-native';

export const StripeCheckoutForm = (props) => {
   return (
     <StripeProvider
       publishableKey="pk_test_51NBKNASIcuDFcsBmbXKCBXzpGEuz3gMfmBVlYR0C796DQW56Du1WYaBknNI1co52ThhjaEdg5UYy8G9QNUPYYHBx00qDOEleqe"
       urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
       merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
     >
       <CheckoutScreen/>
     </StripeProvider>
   );
 }

 function CheckoutScreen() {
   const { initPaymentSheet, presentPaymentSheet } = useStripe();
   const [loading, setLoading] = useState(false);

   const fetchPaymentSheetParams = async () => {
     const response = await fetch(`${API_URL}/payment-sheet`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
     });
     const { paymentIntent, ephemeralKey, customer} = await response.json();

     return {
       paymentIntent,
       ephemeralKey,
       customer,
     };
   };

   const initializePaymentSheet = async () => {
     const {
       paymentIntent,
       ephemeralKey,
       customer,
       publishableKey,
     } = await fetchPaymentSheetParams();

     const { error } = await initPaymentSheet({
       merchantDisplayName: "Example, Inc.",
       customerId: customer,
       customerEphemeralKeySecret: ephemeralKey,
       paymentIntentClientSecret: paymentIntent,
       // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
       //methods that complete payment after a delay, like SEPA Debit and Sofort.
       allowsDelayedPaymentMethods: true,
       defaultBillingDetails: {
         name: 'Jane Doe',
       }
     });
     if (!error) {
       setLoading(true);
     }
   };

   const openPaymentSheet = async () => {
     // see below
   };

   useEffect(() => {
     initializePaymentSheet();
   }, []);

   return (
     <Screen>
       <Button
         variant="primary"
         disabled={!loading}
         title="Checkout"
         onPress={openPaymentSheet}
       />
     </Screen>
   );
 }*/}