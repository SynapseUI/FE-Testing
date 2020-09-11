import { updateItemColor } from "../../helper/helper";

function someReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_ID': // pattern 1
      return Object.assign({}, state, {
        userId: action.userId
      });
    case 'REMOVE_ITEM': // pattern 2
      return Object.assign({}, state, {
        items: state.items.filter(item => item !== action.itemId)
      });
    case 'UPDATE_ITEM_COLOR': // pattern 3
      return Object.assign({}, state, {
        items: updateItemColor(state.items, action.itemId, action.color)
      });
    default:
      return state;
  };
};