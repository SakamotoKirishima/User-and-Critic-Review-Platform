import React,{Component} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import './Upload.css';
import {Link,withRouter} from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Upload extends Component{
    state = {
        selectedFile:null,
        title:'',
        description:'',
        tags:[]
    }
    // if(!props.user)
    //     props.history.push('/')
    fileSelectedHandler = (event)=>{
        this.setState({
            selectedFile:event.target.files[0]
        })
    }
    fileUploadHandler = async (event)=>{
        event.preventDefault()
        // const headers = {
        //     'Authorization': 'Client-ID 667ab1880f44dcb', 
        //     'Cache-Control': null, // this is what will match the response headers
        //     'X-Requested-With': null
        //   }
        //   const fd= new FormData();
        //   fd.append('type', 'file')
        //   fd.append('image',this.state.selectedFile);
        // //   Axios.post('https://api.imgur.com/3/image',{headers:headers},fd)
        // //   .then((res)=>{
        // //       console.log(res)
        // //   });
        // const response = await fetch('https://api.imgur.com/3/upload.json', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Client-ID 667ab1880f44dcb`
        //     },
        //     body: fd
        //     })
        // const data = await response.json()
        // console.log(data)
        const fd= new FormData();
        var success;
        // fd.append('type', 'file')
        fd.append('file',this.state.selectedFile);
        Axios.post('/api/upload',fd,{
            //// receive two    parameter endpoint url ,form data
        })
        .then(res=>{
            console.log(res);
            const embedded_link=res.data;
            console.log(embedded_link);
            // const newArtwork = new FormData();
            // fd.append('title',this.state.title);
            // fd.append('tags',this.state.tags);
            // fd.append('description',this.state.description);
            // fd.append('embedded_link',embedded_link);
            // fd.append('postedBy',this.props.user.displayName);
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
            // console.log(this.state.tags)
            this.tagInput.value=null;
        }
        else if(e.key==='Backspace' && !val){
            this.removeTag(this.state.tags.length-1);
        }
    }
    titleKeyDown=(e)=>{
        const val=e.target.value;
        if( val){
            // console.log(val);
            this.setState({title:val});

            console.log(this.state.title)
        }
    }
    descKeyDown=(e)=>{
        const val=e.target.value;
        if( val){
            // console.log(val);
            this.setState({description:val});
             console.log(this.state)
        }
    }


    render(){
        return (
            <div>

                {/* Navbar Code starts below */}
    



                {/* Navbar Code ends above */}



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
                        <input id="title" type="text" onKeyDown={this.titleKeyDown} className="validate" />
                        <label htmlFor="title" >Title</label>
                    </div>

                    <div className="input-field col s12 customMarginX">
                        <textarea id="textarea2" className="materialize-textarea" onKeyDown={this.descKeyDown}></textarea>
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













/*import React,{Component} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import './Upload.css';

class Upload extends Component{
    state = {
        selectedFile:null,
        title:'',
        description:'',
        tags:[]
    }
    // if(!props.user)
    //     props.history.push('/')
    fileSelectedHandler = (event)=>{
        this.setState({
            selectedFile:event.target.files[0]
        })
    }
    fileUploadHandler = async (event)=>{
        event.preventDefault()
        // const headers = {
        //     'Authorization': 'Client-ID 667ab1880f44dcb', 
        //     'Cache-Control': null, // this is what will match the response headers
        //     'X-Requested-With': null
        //   }
        //   const fd= new FormData();
        //   fd.append('type', 'file')
        //   fd.append('image',this.state.selectedFile);
        // //   Axios.post('https://api.imgur.com/3/image',{headers:headers},fd)
        // //   .then((res)=>{
        // //       console.log(res)
        // //   });
        // const response = await fetch('https://api.imgur.com/3/upload.json', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Client-ID 667ab1880f44dcb`
        //     },
        //     body: fd
        //     })
        // const data = await response.json()
        // console.log(data)
        const fd= new FormData();
        var success;
        // fd.append('type', 'file')
        fd.append('file',this.state.selectedFile);
        Axios.post('/api/upload',fd,{
            //// receive two    parameter endpoint url ,form data
        })
        .then(res=>{
            console.log(res);
            const embedded_link='https://i.imgur.com/k9xY1hE.jpg';
            console.log(embedded_link);
            // const newArtwork = new FormData();
            // fd.append('title',this.state.title);
            // fd.append('tags',this.state.tags);
            // fd.append('description',this.state.description);
            // fd.append('embedded_link',embedded_link);
            // fd.append('postedBy',this.props.user.displayName);
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
            // console.log(this.state.tags)
            this.tagInput.value=null;
        }
        else if(e.key==='Backspace' && !val){
            this.removeTag(this.state.tags.length-1);
        }
    }
    titleKeyDown=(e)=>{
        const val=e.target.value;
        if(e.key==='Enter' && val){
            // console.log(val);
            this.setState({title:val});
            // console.log(this.state.title)
        }
    }
    descKeyDown=(e)=>{
        const val=e.target.value;
        if(e.key==='Enter' && val){
            // console.log(val);
            this.setState({description:val});
             console.log(this.state)
        }
    }
    render(){
        return (
            <div className="Container">  
                <p className="Parag">Hallo {console.log(this.props.user)}</p>
                <input type="file" className="input_image" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler} className="input_img__button">Submit</button>
                <input type='text' onKeyDown={this.titleKeyDown} placeholder="Title Here"></input>
                <input type='textarea' onKeyDown={this.descKeyDown} placeholder="Description here"></input>
                <div className="input-tag">
                    <ul className="input-tag__tags">
                        {this.state.tags.map((tag,i)=>(
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={this.removeTag}>+</button>
                            </li>
                        ))}
                        <li className='input-tag__tags__input'> 
                            <input type='text'  onKeyDown={this.inputKeyDown} ref={(c)=>{this.tagInput=c;}} placeholder="Add relevant tags"/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}

export default connect(mapStateToProps)(Upload);*/