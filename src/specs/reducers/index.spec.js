import {
  reducer,
  open,
  close,
  initialState,
  modalSlice
} from '../../reducers';

describe('modal slice', () => {
  test('initial state', () => {
    expect(
      initialState
    ).toStrictEqual({ "isOpen": false })
  });

  describe('mutations', () => {
    test('open', () => {
      const after = reducer(
        initialState,
        open()
      );

      expect(after).not.toBe(initialState);
      expect(after).toStrictEqual({ "isOpen": true });
    });

    test('close', () => {
      const after = reducer(
        initialState,
        close()
      );

      expect(after).toBe(initialState);
      expect(after).toStrictEqual({ "isOpen": false });
    });
  });
});
