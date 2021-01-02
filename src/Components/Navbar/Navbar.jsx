import React from 'react'
import {AppBar, Toolbar, Typography, Badge, IconButton, Menu, MenuItem} from "@material-ui/core"
import {ShoppingCart} from "@material-ui/icons"
import {Link} from 'react-router-dom'



import useStyles from './styles';

const Navbar = ({totalItems}) => {

    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed"  className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit" >
                        <img src={"none"} alt="" height="25px" className={classes.image} />
                        Salute Electronics
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart"  aria-label= "show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary" >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default Navbar
