import React, { Component } from 'react'
import { withStyles, Typography } from '@material-ui/core'
import Link from 'react-router-dom/Link';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'
//MUI STUFF
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//Icons
import ChatIcon from '@material-ui/icons/Chat'

//Redux
import {connect} from 'react-redux'
const styles ={
    card:{
        position:'relative',
        display:'flex',
        marginBottom: 20
    },
    image:{
        minWidth: 200
    },
    content:{
        padding:25,
        objectFit:'cover'
    }
}

export class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes, 
        scream:{body, createdAt, userImage, userHandle, screamId, likeCount, commentCount, comments}, 
        user:{credentials:{handle},authenticated}} = this.props
        const deleteButton = authenticated && userHandle === handle ? // only show this button when your handle match with the scream's one
        (<DeleteScream screamId = {screamId}/>): null
        return (
            <Card className ={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image} />
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component={Link}to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                        {deleteButton}
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant="body1">{body}</Typography>
                        <LikeButton screamId={screamId}/>
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    </CardContent>
            </Card>
        )
    }
}

Scream.propTypes ={
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Scream))
