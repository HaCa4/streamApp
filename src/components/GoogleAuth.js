import React from "react";
import {connect} from "react-redux";
import {signIn,signOut} from "../actions";

class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load("client:auth2", ()=>{
            window.gapi.client.init({
                clientId:"225716418734-scf065vmikkktlq7r84vfu8nuud796n8.apps.googleusercontent.com",
                scope:"email"
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    };
    
    onAuthChange= isSignedIn => {
        if(isSignedIn===true){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    };
    
    onSignInClick=()=>{
        this.auth.signIn();
    };
    
    onSignOutClick=()=>{
        this.auth.signOut();
    }
    
    renderAuthButton(){
        switch(this.props.isSignedIn){
            case false:
                return (
                    <button onClick={this.onSignInClick} className="ui red google button">
                        <i className="google icon"/>
                        Sign in with Google
                    </button>
                ) ;
            case true:
                return(
                    <button onClick={this.onSignOutClick} className="ui red google button">
                        <i className="google icon"/>
                        Sign Out
                    </button>
                );
            default:
                return null;
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps=(state)=>{
    return  {isSignedIn: state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);