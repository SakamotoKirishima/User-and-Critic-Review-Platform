import React,{Component} from 'react';
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
            const embedded_link=res.data;

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
    render(){
        return (
            <div className="Container">  
                <p className="Parag">Hallo {console.log(this.props.user)}</p>
                <input type="file" className="input_image" onChange={this.fileSelectedHandler} />
                <button onClick={this.fileUploadHandler} className="input_img__button">Submit</button>
                <input type='text' onKeyDown={this.titleKeyDown}></input>
                <div className="input-tag">
                    <ul className="input-tag__tags">
                        {this.state.tags.map((tag,i)=>(
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={this.removeTag}>+</button>
                            </li>
                        ))}
                        <li className='input-tag__tags__input'> 
                            <input type='text'  onKeyDown={this.inputKeyDown} ref={(c)=>{this.tagInput=c;}}/>
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

export default connect(mapStateToProps)(Upload);