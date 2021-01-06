import React from 'react'
import {Button, Typography, Divider } from "@material-ui/core"



import Review from './Review';



const PaymentForm = ({checkoutToken,shippingData,nextStep,backStep,onCaptureCheckout,timeout}) => {

    const handleSubmit = async (event) => { 

            event.preventDefault();

           
                const orderData = {
                    line_items: checkoutToken.live.line_items,
                    customer: {firstname:shippingData.firstName, lastname:shippingData.lastName, email:shippingData.email},
                    shipping:{
                    name:"Primary",
                     street:shippingData.address1,
                      town_city:shippingData.city,
                      county_state:shippingData.shippingSubdivision,
                      postal_zip_code: shippingData.zip,
                      country:shippingData.shippingCountry

                    },
                    fulfillment:{
                        shipping_method:shippingData.shippingOption
                    },
                    payment:{
                        gateway: 'manual',
                        manual:{
                            id:'gtwy_zURSwkv193kOIY2bfS'
                        }

                    }
    
                }

                onCaptureCheckout(checkoutToken.id, orderData);
                nextStep();
               
            }

            return (
                <>
                <Review checkoutToken={checkoutToken}/>
                <Divider/>
                <Typography variant="h6" gutterBottom style={{margin:"20px 0"}} >Payment method</Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <br/> <br/>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Button variant="outlined" onClick={() => backStep()}>Back</Button>
                    <Button type="submit" variant="contained"  color="primary">Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                    </div>
                    </form>
                       
                </>
            )
    }

    


export default PaymentForm
