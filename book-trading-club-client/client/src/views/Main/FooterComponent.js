import React from 'react';
import {Panel} from 'react-bootstrap';
import styles from './styles.module.css'

export class HeaderComponent extends React.Component{
   
    render(){
        return(
            <Panel className={styles.footer}>
            Book Trading Club  -> An application by ComputerlucaWorld - a FreeCodeCamp Project
            Made with React + Bootstrap+ Express + Mongodb + Auth0 Api (authentication)
         
        </Panel>)
    }   
    
    
    
}
export default HeaderComponent;