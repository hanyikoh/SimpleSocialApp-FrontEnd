import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
//MUI STUFF
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//Redux STUFF
import {connect} from 'react-redux'
import {submitComment, clearErrors} from '../../redux/actions/dataAction'

const styles = theme =>({
    ...theme.spreadThis
})

export class CommentForm extends Component {
    state = {
        body:'',
        errors:{}
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.UI.errors){
          return { errors: nextProps.UI.errors};
       }
       if(!nextProps.UI.errors && !nextProps.UI.loading){
           return {errors:{}, body:''}
       }
     }
    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = event =>{
        event.preventDefault()
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }
    render() {
        const {classes, authenticated} = this.props
        const errors = this.state.errors
        const commentFormMarkup = authenticated? (
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={errors.comment? true: false}
                    helperText={errors.comment}
                    value={this.state.body}
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textfield}/>

                    <Button type ="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    >
                        Submit
                    </Button>

                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ):null
        return (
            <Fragment>
                {commentFormMarkup}
            </Fragment>
        )
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated:PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
    UI:state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))
