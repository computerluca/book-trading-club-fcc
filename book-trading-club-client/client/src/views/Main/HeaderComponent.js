import React from 'react';

export class HeaderComponent extends React.Component{
   
    render(){
        return(
            <div><header><h2>Book Trading Club </h2></header>
            <nav>
        <ul>
        {!this.props.auth.loggedIn()?<li><h2>Signin/up</h2></li>:<div></div>}
        {this.props.auth.loggedIn()?<li><h2>Logout</h2></li>:<div></div>}
        </ul>
        </nav>
        </div>)
    }   
    
    
    
}
export default HeaderComponent;