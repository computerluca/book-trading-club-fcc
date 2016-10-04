import React,{PropTypes as T} from 'react';
 import AuthService from '../../../utils/AuthService';
import axios from 'axios';
class Gallery extends React.Component {
  constructor(props){
    super(props);
    this.state={
      auth :new AuthService('your_client_id', 'your_domain_id')
    }
  }
  static propTypes = {
    auth: T.instanceOf(AuthService)
  }
 
  renderImage(book) {
     
    
    var profile = this.state.auth.getProfile();
    var user_id= profile.user_id;
    if(!this.props.activateTradeButton){
    return (
      <div className='thumbnail'>
            
            <img src={book.image} />
            <div className='caption'>
            <h2>{book.title}</h2>
            <h3>Owned by{book.id_user}</h3>
            </div>
            </div>
            
    );
    }
    else{
    const manageButton = function(id){
      var profile = this.state.auth.getProfile();
    var user_id= profile.user_id;
    console.log(id);
      axios.patch('api/traderequests/request/'+id,{id_user:user_id})
  .then(function (response) {
    alert(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
    };
      
      var button = book.id_user!==user_id?<div><button type="button" onClick={manageButton.bind(this,book._id)}>Propose a Trade</button></div>:<div></div>;
      return(
       <div className='thumbnail'>
            
            <img src={book.image} />
            <div className='caption'>
            <h2>{book.title}</h2>
            <h3>Owned by{book.id_user}</h3>
            </div>
            {button}
            </div>
            
            
    );
    }
  }
 
  render() {
    return (
      <div className="gallery">
        <div className="images">
          {this.props.imageUrls.map(book => this.renderImage(book))}
        </div>
      </div>
    );
  }
}

export default Gallery;