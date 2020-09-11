import someReducer from "./someReducer.js";

jest.mock('../../helper/helper.js', () => ({
  updateItemColor: jest.fn(),
}))

describe('someReducer', () => {
  describe('case: UPDATE_USER_ID', () => {
    it('should update userId with id from action', () => {
      const sampleAction = { type: 'UPDATE_USER_ID', userId: 42 };
      const initialState = { userId: false };
      expect(someReducer(initialState, sampleAction)).toEqual({ userId: 42 });
    });
  });


  describe('case: REMOVE_ITEM', () => {
    it('should update userId with id from action', () => {
    const sampleAction = { type: 'REMOVE_ITEM', itemId: 2 };
    const initialState = { items: [ 1, 2, 3, 4, 5 ]};
    expect(someReducer(initialState, sampleAction).items).toEqual(
      expect.not.arrayContaining([ 2 ])
    )});
  });


  describe('case: UPDATE_ITEM_COLOR', () => {
    it('should updates the items piece of state', () => {
      const sampleAction = {
        type: 'UPDATE_ITEM_COLOR',
        itemId: 3,
        color: 'blue'
      };
      const initialState = { items: [{ id: 3, color: 'green' }]};
      expect(someReducer(initialState, sampleAction).items).toBeUndefined();
    });
  
    it('should call updateItemColor from utils file', () => {
      expect(updateItemColor).toHaveBeenCalled();
    });
  });
});