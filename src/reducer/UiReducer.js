const intialState = {
    drop:false,
    activePage:"home",
    activityDrop:false,
    bottomSheet:false,
    sidenav:false,
    isNewPost:false,
    posts:null,
    activeTab:0,
}


const UIReducer = (state=intialState,action)=>{
    switch(action.type){
        case "SET_DROP":{
            return {
                ...state,
                drop:action.drop
            }
        }
        case "SET_TAB":{
            return {
                ...state,
                activeTab:action.tab
            }
        }
        case "SET_POST":{
            return{
                ...state,
                posts:action.posts
            }
        }
        case "ADD_POST":{
            return{
                ...state,
                posts:[action.post,...state.posts]
            }
        }
        case "SET_NEW_POST":{
            return {
                ...state,
                isNewPost:action.isNewPost
            }
        }

        case "SET_SIDENAV":{
            return{
                ...state,
                sidenav:action.sidenav
            }
        }

        case "SET_BOTTOM_SHEET":{
            return {
                ...state,
                bottomSheet:action.bottomSheet
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