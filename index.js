
function createStore (reducer) {
    // The store should have four parts
    // 1. The State
    // 2. Get the State
    // 3. Listen to changes on the state
    // 4. Update the state

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    } 

    return {
        getState,
        subscribe,
        dispatch
    }
}

function todos (state = [], action) {
    if (action === 'ADD_TODO') {
        return state.concat([action.todo])
    }

    return state
}

const store = createStore(todos)

store.subscribe(()=>{
    console.log('The new state is: ', store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Read a book',
        complete: false
    }
})