import { usersAPI } from "../../api/usersAPI";
import { TUser } from "../../types/types";
import friendsReducer, { actionCreators, getFollowedFriends, TState } from "../reducers/friendsReducer";

let state: TState

beforeEach(() => {
    state = {
        friends: [] as TUser[],
        totalFriends: 0
    }
})

const friends = [
    {
        id: 1,
        name: 'Name',
        status: 'status',
        photos: {
            small: 'small',
            large: 'large'
        },
        followed: true
    }
]

test('getFollowedFriends action works', () => {
    expect(friendsReducer(state, actionCreators.getFollowedFriendsAC(friends, 1))).toEqual({
        friends: friends,
        totalFriends: 1
    })
})

jest.mock('../../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(state)
const resolveData = {
    items: friends,
    totalCount: 1,
    error: ''
}
test('getFollowedFriends thunk works', async () => {
    usersAPIMock.getFriends.mockReturnValue(Promise.resolve(resolveData))
    const thunk = getFollowedFriends()
    await thunk(dispatch, getState, {})
    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toBeCalledWith(actionCreators.getFollowedFriendsAC(friends, 1))
})