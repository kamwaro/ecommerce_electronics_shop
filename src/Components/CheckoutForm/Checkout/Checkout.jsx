import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom';
import useStyles from './styles'
import {commerce} from '../../../lib/Commerce'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps=["Shipping address", "Payment details"];

const Checkout = ({cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
       const generateToken = async () => {

        try {
            const token = await commerce.checkout.generateToken(cart.id, { type:"cart" } );
            console.log(token)
            console.log(`I am not getting the ${token}`)
            setCheckoutToken(token);
            
            
        }
        catch (error) {
            console.log(error)
            if (activeStep !== steps.length) history.push('/');
        }
       }

       console.log('I am getting things done!')
       console.log(cart);
       generateToken();
    }, [cart, history]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 )
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 )

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
          setTimeout(() => {
              console.log("Hello, World!")
              setIsFinished(true);
          }, 3000);  
    }

    let Confirmation = () => order.customer ?  (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider classeName={classes.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to='/' variant="outlined" type="button">Back to home</Button>
        </>
    ) : isFinished ? (
    <>
    <div>
        <Typography variant="h5">Thank you for your purchase.</Typography>
        <Divider classeName={classes.divider}/>
    </div>
    <br/>
    <Button component={Link} to='/' variant="outlined" type="button">Back to home</Button>
    </>
    ) : (
    <div className={classes.spinner}>
        <CircularProgress/>
    </div>)

    if(error){
        <>
        <Typography variant="h5">
            Error : {error}
        </Typography>
        <br/> 
        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} backStep={backStep} nextStep={nextStep} timeout={timeout} checkoutToken={checkoutToken}/>
    
 


    return (
        <>
        <CssBaseline/>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/> }
            </Paper>

        </main>
            
        </>
    )
}

export default Checkout
