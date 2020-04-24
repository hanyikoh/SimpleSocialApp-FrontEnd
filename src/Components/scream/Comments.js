import React, {
    Component,
    Fragment
} from 'react'
import {
    withStyles,
    Typography
} from '@material-ui/core'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

import Grid from '@material-ui/core/Grid'

const styles = theme =>({
    ...theme.spreadThis,
    commentImage:{
        maxWidth:'100%',
        height:100,
        objectFit:'cover',
        borderRadius:'50%'
    },
    comentData:{
        marginLeft:20
    }
})

class Comments extends Component{
    render(){
        const {comments,  classes} = this.props
    
    return(
        <Grid container>
            {comments.map((comment, index)=>{
                const {body, createdAt, userImage, userHandle} = comment
                return (
                    <Fragment>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="comment" className={classes.commentImage}/>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                        variant="h5"
                                        component={Link}
                                        to={`/users/${userHandle}`}
                                        color="primary">
                                            {userHandle}
                                        </Typography>
                                        <Typography
                                        variant="body2"
                                        color="primary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator}/>
                                        <Typography variant="body1">{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {(index!==comment.length -1) && (
                        <hr className={classes.invisibleSeparator}/>)}
                    </Fragment>
                )
            })}
        </Grid>
    )
  }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}


export default withStyles(styles)(Comments)