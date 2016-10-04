


import React, { PropTypes as T } from 'react' ;
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AuthService from '../../../utils/AuthService';
import axios from 'axios';
// import statements

const CLOUDINARY_UPLOAD_PRESET = 'qsuk7myx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpimbrl1b/upload';

export default class UploadComponent extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

  }
  
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
    var profile = this.props.auth.getProfile();
    var user_id= profile.user_id;
    
    axios.post('/api/books/new', {
    title: this.refs.title.value,
    image:this.state.uploadedFileCloudinaryUrl,
    id_user:user_id
  })
  .then(function (response) {
    console.log("risposta");
  })
  .catch(function (error) {
    console.log(JSON.stringify(error));
  });
      }
    });
  }

  render() {
    return (
      <form>
      
        <div className="FileUpload">
       <label for="title">Title of the book <input type="text" ref="title" placeholder="Write the title of your book" /></label>
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
            
          </div>}
          
        </div>
        <button type="button" onClick={this.handleImageUpload.bind(this,this.state.uploadedFile)}>Save</button>
      </form>
    )
  }
}