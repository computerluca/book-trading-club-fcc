import React from 'react';
import axios from 'axios';
import Gallery from './Gallery';
class AllBooks extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={
            books:[],
            isLoading:true
        }
    }
    componentDidMount(){
        axios.get('/api/books')
        .then((response)=>{
            this.setState({books:response.data,isLoading:false})
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    render()
    {
            if(!this.state.isLoading){
        return(
            
                <Gallery imageUrls={this.state.books} activateTradeButton />
            
    
            )
            }
            else{
                return(
                <div>Loading ....</div>
                )
            }
            
    }
}
export default AllBooks;