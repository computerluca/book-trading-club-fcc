import React, { PropTypes as T } from 'react' ;
import axios from 'axios';
import AuthService from '../../../utils/AuthService';
import Gallery from './Gallery';
export default class MyBooks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            outstanding:[],
            unapproved:[],
            isLoading:false
        }
    }
    static propTypes = {
    auth: T.instanceOf(AuthService)
  }
    componentDidMount(){

        
        this.loadData();
    }
    loadData(){
        this.loadBooksData();
        this.loadOutStandingData();
        this.loadUnapprovedData();
    }
    loadUnapprovedData(){
         let profile = this.props.auth.getProfile();
    let user_id= profile.user_id;
    axios.get('/api/traderequests/unapproved/'+user_id)
        .then((response)=>{
            this.setState({
            unapproved:response.data,
            isLoading:false
        })
        
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    loadBooksData(){
         let profile = this.props.auth.getProfile();
    let user_id= profile.user_id;
        axios.get('/api/books/id_user/'+user_id)
        .then((response)=>{
            this.setState({
            books:response.data,
            isLoading:false
        })
        
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    loadOutStandingData(){
        let profile = this.props.auth.getProfile();
    let user_id= profile.user_id;
         axios.get('/api/traderequests/outstanding/'+user_id)
        .then((response)=>{
            this.setState({
                outstanding:response.data            })
        })
        .catch((error)=>{
            console.log(error);
        });
    }
   generateList1 (){
       var list = this.state.outstanding.map(function(proprieta){
                    return(<li>{proprieta.title}</li>)
                });
                
                return list;
   }
   generateList2(){
       
       var list2 = this.state.unapproved.map((proprieta)=>{
           
                    return(<li>{proprieta.title}
                    <button type="button" onClick={this.manageButtonClick.bind(this,proprieta._id)}>Approve</button></li>)
                });
                return list2;
   }
    manageButtonClick (id){
       
             axios.patch('api/traderequests/approve/'+id,{_id:id})
  .then( (response)=> {
      this.loadData();
    alert(response.data);
  })
  .catch( (error)=> {
    console.log(error);
  });
         }
    render (){
         
            
            
            
            if(this.state.isLoading){
                return (<div>Loading</div>)
            }
            else{
                
                
                                return(
                                    <div>
                                    <h2>Your outstanding requests:</h2>
                                    <ul>
                                    {this.generateList1()}
                                    </ul>
                                    <h2>The request to approve:</h2>
                                    <ul>
                                    {this.generateList2()}
                                    </ul>
                                    <h2>The books you own</h2>
                                    <Gallery imageUrls={this.state.books}/></div>)

            }

    
    }
    
}