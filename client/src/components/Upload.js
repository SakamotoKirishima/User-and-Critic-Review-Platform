import React,{Component} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import './Upload.css';
import {withRouter} from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

class Upload extends Component{
    state = {
        selectedFile:null,
        title:'',
        description:'',
        tags:[]
    }
    fileSelectedHandler = (event)=>{
        this.setState({
            selectedFile:event.target.files[0]
        })
    }
    fileUploadHandler = async (event)=>{
        event.preventDefault()
        const fd= new FormData();
        fd.append('file',this.state.selectedFile);
        Axios.post('/api/upload',fd,{
            //// receive two parameter endpoint url ,form data
        })
        .then(res=>{
            const embedded_link=res.data;
            const newArtwork = {
                'title':this.state.title,
                'tags':this.state.tags,
                'description':this.state.description,
                'embedded_link':embedded_link,
                'postedBy':this.props.user.displayName
            }
            Axios.post('/api/addartwork',newArtwork,{})
            .then(res=>{
                console.log(res);
                alert('Artwork Uploaded Successfully');
                this.props.history.push("/profile");
            })
        });
    }
    removeTag=(i)=>{
        const updTags=[...this.state.tags];
        updTags.splice(i,1);
        this.setState({tags:updTags})
    }
    inputKeyDown=(e)=>{
        const val = e.target.value;
        if(e.key==='Enter' && val){
            if(this.state.tags.find(tag=>tag.toLowerCase()===val.toLowerCase())){
                this.tagInput.value=null;
                return
            }
            this.setState({tags:[...this.state.tags,val]})
            this.tagInput.value=null;
        }
        else if(e.key==='Backspace' && !val){
            this.removeTag(this.state.tags.length-1);
        }
    }
    titleKeyDown=(e)=>{
        const val=e.target.value;
        if(val){
            this.setState({title:val});

            console.log(this.state.title)
        }
    }
    descKeyDown=(e)=>{
        const val=e.target.value;
        if(val){
            this.setState({description:val});
             console.log(this.state)
        }
    }


    render(){
        return (
            <div>

                <Row className="titlePadding">
                  <h1 className="headingStyle">Upload Artwork</h1>
                </Row>

                <Row className="align-items-center">
                    <Col></Col>
                    <Col xs={8} className="center">


                    <div className="file-field input-field customMarginX">
                        <div className="btn" id="inputButtonCustom">
                            <span id="spanImage">Upload Image</span>
                            <input type="file" onChange={this.fileSelectedHandler}/>
                        </div>
                        <div className="file-path-wrapper inline">
                            <input className="file-path validate" type="text" placeholder="Upload Cover Image" />
                        </div>
                    </div>



                    <div className="input-field col s6 center customMarginX">
                        <input id="title" value={this.state.title} type="text" onChange={this.titleKeyDown} className="validate" />
                        <label htmlFor="title" >Title</label>
                    </div>

                    <div className="input-field col s12 customMarginX">
                        <textarea id="textarea2" value={this.state.description} className="materialize-textarea" onChange={this.descKeyDown}></textarea>
                        <label htmlFor="textarea2">Short Description</label>
                    </div>

                
                        <div className="input-tag customMarginX" id="tagsDiv">
                            <ul className="input-tag__tags">
                                {this.state.tags.map((tag,i)=>(
                                    <li key={tag}>
                                        {tag}
                                        <button className = "critleButton" type="button" onClick={this.removeTag}>+</button>
                                    </li>
                                ))}
                                <li className='input-tag__tags__input'> 
                                    <input type='text'  onKeyDown={this.inputKeyDown} ref={(c)=>{this.tagInput=c;}} placeholder="Add relevant tags"/>
                                </li>
                            </ul>
                        </div>

                        <button onClick={this.fileUploadHandler} className="critleButton input_img__button">Upload Artwork</button>
                        <Nav.Link href="/" className="navMargin">Cancel</Nav.Link>


                    </Col>
                    <Col></Col>
                </Row>
   
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Upload));