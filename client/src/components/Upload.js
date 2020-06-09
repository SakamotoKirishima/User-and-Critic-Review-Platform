import React,{Component} from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';

class Upload extends Component{
    state = {
        selectedFile:null
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
        // fd.append('type', 'file')
        fd.append('file',this.state.selectedFile);
        Axios.post('/api/upload',fd,{
            //// receive two    parameter endpoint url ,form data
        })
        .then(res=>{
            console.log(res);
        });
    }
    render(){
        return (
            <div>   
                <p>Hallo {console.log(this.props.user)}</p>
                <input type="file" className="input-image" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler}>Submit</button>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.auth
    }
}

export default connect(mapStateToProps)(Upload);