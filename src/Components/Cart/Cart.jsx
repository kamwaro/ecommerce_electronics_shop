import React from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import CartItem from './CartItem/CartItem'
import useStyles from './styles' 
import {Link} from 'react-router-dom'


const Cart = ( {cart, handleEmptyCart, handleRemoveFromCart, handleUpdateCartQty} ) => {
    const classes = useStyles();
     

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>
    )

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                 <Grid item xs={12} sm={4} key={item.id}>
                   <CartItem item={item} onhandleRemoveFromCart={handleRemoveFromCart} onhandleUpdateCartQty={handleUpdateCartQty}/>
                 </Grid>
 
            ))}
        </Grid>

        <div className={classes.cardDetails}>
            <Typography variant="h4">
                Subtotal:{cart.subtotal.formatted_with_symbol}
            </Typography>

            <div>
                <Button className={classes.emptyButton} color="secondary" size="large" type="button" variant="contained" onClick={() => handleEmptyCart()} >
                    Empty Cart
                </Button>
                <Button className={classes.checkOutButton} component={Link} to="/checkout" color="primary" size="large" type="button" variant="contained">
                    Check out
                </Button>
            </div>
        </div>
        </>
    )
       

    if(!cart.line_items) return 'Loading...' 

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart;
