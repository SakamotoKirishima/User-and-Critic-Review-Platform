import Axios from 'axios'

export const handleSubmit = (newName)=>{
    return(dispatch,getState)=>{
        var userdata=getState()
        console.log(userdata)
        Axios.put(`/api/update/${userdata.auth.googleId}/${newName}`).then(response=>{
            console.log(response);
            dispatch({type:'UPDATE_DISPLAY_NAME',payload:{...response}});
            if(response.data.msg==='Name Updated Successfully')
            {
                alert('Name Updated Successfully')
                //window.location.reload(true)
            }
        })
    }
}