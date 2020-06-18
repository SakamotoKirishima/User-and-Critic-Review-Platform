import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import "./Header.css"

const Header = (props)=>{



    const renderContent =()=>{
        // console.log(props.user)
        switch(props.user){
            case null:
                return <li ><a className="amazingNav" href="/">Loading</a></li>
            case false:
                return <li><a className="amazingNav" href="/auth/google">Signup</a></li>
            default:
                {
                    if(props.user.genderType=="")
                        return (
                            <React.Fragment>
                                <li><Link className="amazingNav" to="/profile">Profile</Link></li>
                                <li><Link className="amazingNav" to="/explore">Explore</Link></li>
                                <li><Link className="amazingNav" to="/upload">Upload</Link></li>
                                <li><a className="amazingNav" href="/api/logout/">Logout</a></li>
                            </React.Fragment>
                        )
                    return <React.Fragment>
                            <li><Link className="amazingNav" to="/profileAdmin">Dashboard</Link></li>
                            <li><a className="amazingNav" href="/api/logout/">Logout</a></li>
                        </React.Fragment>
                    }
            }
        }
    
    return(
        <nav>
        <div className="nav-wrapper white">
            <Link to={props.user?'/profile':'/'} className="brand-logo" id="critleBrandNavbar">Critle</Link>
            <ul id="nav-mobile" className="right ">
                {renderContent()}
            </ul>
        </div>
        </nav>
    )
}

const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps)(Header);