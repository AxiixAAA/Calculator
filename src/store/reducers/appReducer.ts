import { TThunkAction } from "../../types/types";
import { getAuthThunk } from "./authReducer";

const INITIAL_APP = 'app/INITIAL-APP';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: TAction):TState => {
    switch (action.type) {
        case (INITIAL_APP):
            return ({
                ...state,
                initialized: true
            });
        default:
            return state;
    }
}

export const initialAppAC = ():TInitialAppAction => ({ type: INITIAL_APP })

export const initialApp = (): TThunkAction<TAction, void> => async (dispatch) => {
    await dispatch(getAuthThunk())
    dispatch(initialAppAC())
}

export default appReducer


type TState = typeof initialState
type TAction = TInitialAppAction
type TInitialAppAction = {type: typeof INITIAL_APP}