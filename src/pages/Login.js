import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import AppIcon from '../images/logo192.png'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {loginUser} from '../redux/actions/userAction' 
import {connect} from 'react-redux'

const styles = (theme) =>({
...theme.spreadThis
})


export class Login extends Component {
    constructor() {
        super();
        this.state ={
            email:'',
            password:'',
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors})
        }
    }
    handleSubmit =(event) =>{
        event.preventDefault()
        console.log("hi")
        const userData ={
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    handleChange =(event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
        
    }
    render() {
        const {classes , UI:{loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className ={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src ={AppIcon} alt ="monkey" className={classes.image}></img>
                    <Typography variant ="h2" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        label="Email" 
                        className={classes.textField} 
                        helperText={errors.email} 
                        error={errors.email? true: false}
                        value ={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth>
                        </TextField>

                        <TextField 
                        id="password" 
                        name="password" 
                        label="Password" 
                        className={classes.textField} 
                        helperText={errors.email} 
                        error={errors.password? true: false}
                        value ={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth></TextField>
                        {
                            errors.general && (
                                <Typography variant ="body2" className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )
                        }
                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                            Login
                        {
                            loading && (
                                <CircularProgress className = {classes.progress}/>
                            )
                        }
                        </Button>
                        <br/>
                        <small>Dont' have an account? Sign up<Link to='/signup'> Here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}
Login.propTypes ={
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    user: state.user,
    UI:state.UI
})

const mapActionToProps = {
    loginUser 
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login))
