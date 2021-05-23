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

        default:
            return{
                ...state
            }
    }
}

export default UserReducer;