import { dialogsAPI, TOpponent, TOpponentMessages } from '../../api/dialogsAPI'
import { TThunkAction } from '../../types/types'
import { TReturnActionType } from '../reduxStore'

const GET_OPPONENTS = 'dialogs/GET-OPPONENTS'
const GET_DIALOG_WITH_OPPONENT = 'dialogs/GET-DIALOG-WITH-OPPONENT'
const SET_CURRENT_OPPONENT_ID = 'dialogs/SET-CURRENT-OPPONENT-ID'
const SEND_MESSAGE = 'dialogs/SEND-MESSAGE'

const initialState = {
    opponents: [] as TOpponent[],
    messages: [] as TOpponentMessages[],
    currentOpponent: {} as TOpponent
}

const dialogsReducer = (state = initialState, action: TAction): TState => { 
    switch (action.type) {
        case GET_OPPONENTS:
            return {
                ...state,
                opponents: [...action.data]
            }
        case GET_DIALOG_WITH_OPPONENT:
            return {
                ...state,
                messages: [...action.items]
            }
        case SET_CURRENT_OPPONENT_ID:
            return {
                ...state,
                currentOpponent: action.opponent
            }
        default:
            return state;
    }
}

export const actionCreators = {
    getOpponents: (data: TOpponent[]) => ({ type: GET_OPPONENTS, data } as const),
    getDialogWithOpponent: (items: TOpponentMessages[]) => ({ type: GET_DIALOG_WITH_OPPONENT, items } as const),
    setCurrentOpponent: (opponent: TOpponent) => ({ type: SET_CURRENT_OPPONENT_ID, opponent } as const)
}

export const getDialogsOpponents = (): TThunk => async (dispatch) => {
    const data: TOpponent[] = await dialogsAPI.getDialogsOpponents()
    dispatch(actionCreators.getOpponents(data))
}

export const getDialogWithOpponent = (userId: number): TThunk => async (dispatch) => {    
    const data = await dialogsAPI.getDialogWithOpponent(userId)
    dispatch(actionCreators.getDialogWithOpponent(data.items))
}

export const sendMessage = (userId: number, message: string): TThunk => async (dispatch) => {
    const data = await dialogsAPI.sendUserMessage(userId, message)
    data.resultCode === 0 && dispatch(getDialogWithOpponent(userId))
}

export const startDialog = (userId: number): TThunk => async (dispatch) => {
    const data = await dialogsAPI.startDialog(userId)
    data.resultCode === 0 && dispatch(getDialogsOpponents())
}

export default dialogsReducer;


type TState = typeof initialState
type TAction = TReturnActionType<typeof actionCreators>
type TThunk = TThunkAction<TAction>