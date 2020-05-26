import axois from 'axios'

export const fetchUserAction = ()=>{
    return (dispatch)=>{
        axois.get('/api/current_user')
        .then((res)=>{
            dispatch({type:'GET_USER',payload:res.data})
        })
    }
}