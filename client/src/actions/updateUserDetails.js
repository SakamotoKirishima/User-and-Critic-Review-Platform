import Axios from 'axios'

export const handleSubmit = (newName)=>{
    return(dispatch,getState)=>{
        var userdata=getState()
        Axios.put(`/api/update/${userdata.auth.googleId}/${newName}`).then(response=>{
            if(response.data===newName)
            {
                dispatch({type:'UPDATE_DISPLAY_NAME',payload:response.data});
                alert('Name updated Successfully');
            }
            else
                alert(response.data)
        })
    }
}