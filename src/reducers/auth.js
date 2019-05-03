export default(state={},action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                name: action.name, uid:action.uid
            }
        case 'LOGOUT' :
        return{};
        case 'SET_NAME':
        return{...state,name: action.name} 
    
        default:
            return state;
        }
    };