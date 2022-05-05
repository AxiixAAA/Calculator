import { authAPI, TAuthData, TLoginData, TLoginValues } from '../../api/authAPI';
import authReducer, { actionCreators, getAuthThunk, loginThunk, logoutThunk } from '../reducers/authReducer';
jest.mock('../../api/authAPI')

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLogged: false,
    errorMessage: null as string[] | null,
    captchaURL: null as string | null,
    isNavMenu: false
};

beforeEach(() => {
    initialState = {
        id: null,
        email: null,
        login: null,
        isLogged: false,
        errorMessage: null,
        captchaURL: null,
        isNavMenu: false
    }
})

test('Reduce works right', () => {
    expect(authReducer(initialState, {
        type: 'auth/SET-AUTH-USER-DATA', payload: {
            id: 235,
            email: 'asas@sas.as',
            login: 'asasa',
            isLogged: true
        }
    })).toEqual({
        id: 235,
        email: 'asas@sas.as',
        login: 'asasa',
        isLogged: true,
        errorMessage: null,
        captchaURL: null,
        isNavMenu: false
    })
})

const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(initialState)
const resolveData = (data: TAuthData | TLoginData | {}): any => ({
    data: data,
    resultCode: 0,
    messages: []
})

test('getAuth returns right data', async () => {
    const data: TAuthData = {
        id: 1,
        email: 'asd',
        login: 'dsa'
    }

    authAPIMock.getAuth.mockReturnValue(Promise.resolve(resolveData(data)))
    const thunk = getAuthThunk()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(actionCreators.setAuthUserData(1, 'asd', 'dsa', true))
})

test('Login works', async () => {
    const data: TLoginData = { userId: 1 }
    const loginInputData: TLoginValues = {
        email: 'aaa@bbb.cc',
        password: 'aaa',
        rememberMe: false
    }
    authAPIMock.login.mockReturnValue(Promise.resolve(resolveData(data)))
    const thunk = loginThunk(loginInputData)
    await thunk(dispatch, getState, {}) // await works, VSCode fuck off
    expect(dispatch).toBeCalledTimes(1)
})

test('Logout works', async () => {
    authAPIMock.logout.mockReturnValue(Promise.resolve(resolveData({})))
    const thunk = logoutThunk()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(actionCreators.setAuthUserData(null, null, null, false))
})
