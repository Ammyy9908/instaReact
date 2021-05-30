const intialState = {
    user:null
}


const UserReducer = (state=intialState,action)=>{
    switch(action.type){
        case "SET_USER":{
            return {
                ...state,
                user:action.user
            }
        }

        case "SET_AVATAR":{
            state.user.avatar = action.avatar;
            return{
                ...state,
                

            }
        }

        default:
            return{
                ...state
            }
    }
}

export default UserReducer;