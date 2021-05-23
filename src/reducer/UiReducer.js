const intialState = {
    drop:false,
    activePage:"home",
    activityDrop:false
}


const UIReducer = (state=intialState,action)=>{
    switch(action.type){
        case "SET_DROP":{
            return {
                ...state,
                drop:action.drop
            }
        }
        case "SET_ACTIVITY_DROP":{
            return {
                ...state,
                activityDrop:action.activityDrop
            }
        }
        case "SET_PAGE":{
            return{
                ...state,
                activePage:action.activePage
            }
        }

        default:
            return{
                ...state
            }
    }
}

export default UIReducer;