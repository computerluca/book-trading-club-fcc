/* ===== ./src/components/Profile/ProfileEdit.js ===== */
import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'
import AuthService from '../../../utils/AuthService';
import {Row, Col, Image, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import s from './styles.module.css'

export class ProfileEdit extends React.Component {
  // receiving AuthService instance and profile data as props
  
constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }
  // method trigged when edit form is submitted
  handleSubmit(e){
    e.preventDefault()
    const { profile} = this.props.location.state;
const auth = new AuthService('your_client_id', 'your_domain_id');
    console.log(this.props.route);
    auth.updateProfile(profile.user_id, {
      user_metadata: {
        name: ReactDOM.findDOMNode(this.refs.name).value,
        city: ReactDOM.findDOMNode(this.refs.city).value,
        state: ReactDOM.findDOMNode(this.refs.state).value 
      }
    })
  }

  render(){
   var profile = this.props.location.state.profile;
   let name,city,state;
   if(profile.user_metadata){
     name = profile.user_metadata.name || "";
     city = profile.user_metadata.city || "";
    state = profile.user_metadata.state || "";
   }
    return (
      <Row className={s.root}>
        <Col md={4} mdOffset={6}>
          <h3>Editing Profile</h3>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" defaultValue={name} ref="name" />
              </Col>
            </FormGroup>
            <FormGroup controlId="city">
              <Col componentClass={ControlLabel} sm={2}>
                City
              </Col>
              <Col sm={10}>
                <FormControl type="text" defaultValue={city} ref="city" />
              </Col>
            </FormGroup>
            <FormGroup controlId="state">
              <Col componentClass={ControlLabel} sm={2}>
                State
              </Col>
              <Col sm={10}>
                <FormControl type="text" defaultValue={state} ref="state" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">Save</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default ProfileEdit;