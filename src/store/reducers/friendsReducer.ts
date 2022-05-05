import { TThunkAction, TUser } from "../../types/types";
import { usersAPI } from "../../api/usersAPI";
import { TReturnActionType } from "../reduxStore";

const GET_FOLLOWED_FRIENDS = 'friends/GET-FOLLOWED-FRIENDS'

const initialState = {
    friends: [] as TUser[],
    totalFriends: 0
}

const friendsReducer = (state = initialState, action: TAction): TState => {
    switch (action.type) {
        case (GET_FOLLOWED_FRIENDS):
            return ({
                ...state,
                friends: action.payload.friends,
                totalFriends: action.payload.totalFriends
            })
        default:
            return state;
    }
}

export const actionCreators = {
    getFollowedFriendsAC: (friends: TUser[], totalFriends:number) => (
        { type: GET_FOLLOWED_FRIENDS, payload: { friends, totalFriends } } as const)
}

export const getFollowedFriends = ():TThunk => async (dispatch) => {
    const data = await usersAPI.getFriends();
    dispatch(actionCreators.getFollowedFriendsAC(data.items, data.totalCount))
}

export default friendsReducer;


export type TState = typeof initialState
type TAction = TReturnActionType<typeof actionCreators>
type TThunk = TThunkAction<TAction>