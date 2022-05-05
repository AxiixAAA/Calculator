import appReducer, { initialApp, initialAppAC } from '../reducers/appReducer';
import { getAuthThunk } from '../reducers/authReducer';
jest.mock('../reducers/authReducer')

let initialState = {initialized: false};

beforeEach(() => {
    initialState = {initialized: false}
})

test(`Reducer gets 'app/INITIAL-APP' and returns true`, () => {
    expect(appReducer(initialState, { type: 'app/INITIAL-APP' })).toEqual({initialized: true})
})

test('Initial App Success', async () => {
    const thunk = initialApp()
    const dispatch = jest.fn()
    const getState = jest.fn()
    await thunk(dispatch, getState, {}) // await works, VSCode fuck off
    expect(dispatch).toBeCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, getAuthThunk())
    expect(dispatch).toHaveBeenNthCalledWith(2, initialAppAC())
})