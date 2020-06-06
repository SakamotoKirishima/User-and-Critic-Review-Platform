export const authReducer = (state=null,action)=>{
    //console.log(action.payload)
    switch(action.type){
        case 'GET_USER':
            return action.payload || false
        case 'UPDATE_DISPLAY_NAME':
            {
                var newSt = {...state,displayName:action.payload}
                return newSt
            }
        default :
            return state
    }
}