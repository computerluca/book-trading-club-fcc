import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'
import styles from './styles.module.css'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
export class Container extends React.Component {
  static contextTypes = {
    router: T.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <Jumbotron>
      <HeaderComponent auth={this.props.route.auth}/>
        
        {children}
        <FooterComponent />
      </Jumbotron>
    )
  }
}

export default Container;
