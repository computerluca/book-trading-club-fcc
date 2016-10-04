import React from 'react';
export class HeaderComponent extends React.Component{
   
    render(){
        return(
             <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">BTC</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
               {this.props.auth.loggedIn()?<li><a href="#newbook">NEW BOOK</a></li>:''}
               {this.props.auth.loggedIn()?<li><a href="#mybooks">MyBooks</a></li>:''}
              {this.props.auth.loggedIn()?<li><a href="#allbooks">All Books</a></li>:''}
              
            </ul>
            
          </div>
        </div>
      </nav>


       
        )
    }   
    
    
    
}
export default HeaderComponent;