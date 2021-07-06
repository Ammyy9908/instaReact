export const setDrop=(drop)=>({
    type:"SET_DROP",
    drop
})

export const setPost=(posts)=>({
    type:"SET_POST",
    posts
})

export const addPost=(post)=>({
    type:"ADD_POST",
    post
})

export const setTab = (tab)=>({
    type:"SET_TAB",
    tab
})

export const setNewPost = (isNewPost)=>({
    type:"SET_NEW_POST",
    isNewPost
})
export const setPage = (activePage)=>({
    type:"SET_PAGE",
    activePage
})

export const setActivityDrop = (activityDrop)=>({
    type:"SET_ACTIVITY_DROP",
    activityDrop
})

export const setBottomSheet = (bottomSheet)=>({
    type:"SET_BOTTOM_SHEET",
    bottomSheet,
})

export const setSidenav = (sidenav)=>({
    type:"SET_SIDENAV",
    sidenav
})