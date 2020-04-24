import React, {
    Component,
    Fragment
} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import MyButton from '../../util/MyButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {connect} from 'react-redux'
import {postScream} from '../../redux/actions/dataAction'
import {clearErrors} from '../../redux/actions/dataAction'

const styles = theme => ({
...theme.spreadThis,
submitButton:{
    position:"relative"
},
progressSpiner:{
    position: "absolute"
},
closeButton:{
    position:"absolute",
    left:'91%',
    top:'6%'
},
submitButton:{
    marginTop:10,
    float:'right',
    position:'relative'
}
})

export class PostScream extends Component {
    state = {
        open:false,
        body:'',
        errors:{}
    };
    handleOpen = () =>{
        this.setState({open:true})
    }
    handleClose = () =>{
        this.props.clearErrors()
        this.setState({open:false, errors:{}})
    }
    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = event =>{
        event.preventDefault();
        this.props.postScream({body:this.state.body})

    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.UI.errors){
          return { errors: nextProps.UI.errors};
       }
       else if(!nextProps.UI.errors && !nextProps.UI.loading){
           return{
               errors:{}
            }
       }
       else return null;
     }
    render() {
        const {errors} = this.state;
        const {classes, UI:{loading}} = this.props
        return (
            <Fragment>
                <MyButton onClick = {this.handleOpen} tip="Post a scream!">
                    <AddIcon/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>Create a new Post!</DialogTitle>
                <DialogContent>
                    <form onSubmit = {this.handleSubmit}>
                        <TextField
                        name="body"
                        type="text"
                        label="Scream Content"
                        multiline
                        rows="3"
                        placeholder="Scream at your fellow apes"
                        error={errors.body? true: false}
                        helperText={errors.body}
                        className={classes.TextField}
                        onChange={this.handleChange}
                        fullWidth
                        />
                            <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                            >
                                Submit
                                {loading && (
                                <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                    </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream : PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    UI:state.UI
})

export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(styles)(PostScream)) 
