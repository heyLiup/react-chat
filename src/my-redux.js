
export function createStore(reducer){
    let currentState={};
    let currentListen=[]
    function dispatch(action){
        currentState=reducer(currentState,action)
        currentListen.forEach(v=>v())
        // return action
    }
    function subscribe(fun){
        currentListen.push(fun);

    }
    function getState(){
        return currentState
    }
    dispatch({type:"@imooc"})
    return {dispatch,subscribe,getState}
}