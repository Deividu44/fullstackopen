const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let goodNew = state.good
      goodNew++
      return {...state, good: goodNew}
    case 'OK':
      let okNew = state.ok
      okNew++
      return {...state, ok: okNew}
    case 'BAD':
      let badNew = state.bad
      badNew++
      return {...state, bad: badNew}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
