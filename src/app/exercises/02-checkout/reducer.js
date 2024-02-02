import { produce } from 'immer';

function reducer(state, action) {
  const nextState = produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
          return;
        }

        draftState.push({
          ...action.item,
          quantity: 1,
        });
        return;
      }

      case 'delete-item': {
        const itemIndex = state.findIndex((item) => item.id === action.item.id);

        draftState.splice(itemIndex, 1);
        return;
      }
      case 'save-items': {
        return action.payload;
      }
    }
  });
  //Save the state to localStorage
  // Save the new state to localStorage after every action
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('cartItems', JSON.stringify(nextState));
  }

  return nextState;
}

export default reducer;
