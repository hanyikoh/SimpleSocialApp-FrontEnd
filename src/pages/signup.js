import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types';
import AppIcon from '../images/logo192.png'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import {signupUser} from '../redux/actions/userAction' 
import {connect} from 'react-redux'

const styles = (theme) =>({
...theme.spreadThis
})


export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword:'',
      handle:'',
      loading: false,
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
        this.setState({errors:nextProps.UI.errors})
    }
}
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    this.setState({
      loading: true,
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history)
  };
  render() {
    const { classes, UI:{loading} } = this.props;
    const { errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image}></img>
          <Typography variant="h2" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.email}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirmPassword"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            ></TextField>

            <TextField
              id="handle"
              name="handle"
              type="text"
              label="handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Signup
              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />
            <small>
              Already Have a account ? Login<Link to="/login"> Here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
signup.propTypes ={
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  user: state.user,
  UI: state.UI
})


export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
