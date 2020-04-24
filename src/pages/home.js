import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Scream from '../Components/scream/Scream'
import Profile from '../Components/profile/Profile'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getScreams} from '../redux/actions/dataAction'
import ScreamSkeleton from '../util/ScreamSkeleton'
export class home extends Component {
    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const {screams, loading} = this.props.data;
        let recentScreamsMarkup = !loading? (
        screams.map(scream => <Scream key={scream.screamId} scream ={scream}></Scream>)
        ) : <ScreamSkeleton/>
        return (
            <Grid container spacing ={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data : state.data // All the state in store (user, UI and data)
})

export default connect (mapStateToProps, {getScreams})(home)
