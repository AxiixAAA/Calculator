import { postAPI, TApiPost } from "../../api/postAPI"
import { TThunkAction } from "../../types/types"
import { TReturnActionType } from "../reduxStore"

const ADD_POST = 'profile/ADD-POST',
    PRESS_LIKE = 'profile/PRESS-LIKE',
    GET_POST = 'profile/GET_POST'

const initialState = {
    posts: [] as TPost[],
    updateInput: ''
}

const profileReducer = (state = initialState, action: TAction): TState => {
    switch (action.type) {
        case ADD_POST:
            const newPost: TPost = {
                id: Math.random(),
                text: action.postText,
                likes: 0,
                onLike: false
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case PRESS_LIKE:
            return {
                ...state,
                posts: state.posts.map(item => {
                    if (item.id === action.id) {
                        return {
                            ...item,
                            onLike: !item.onLike,
                            likes: item.onLike ? --item.likes : ++item.likes
                        }
                    }

                    return item;
                })
            }
        case GET_POST:
            return {
                ...state,
                posts: [
                    {
                        id: Math.floor(Math.random() * 100),
                        text: 'Бэкенда с постами нет, поэтому они тут все время рандомные.',
                        likes: 1,
                        onLike: true
                    },
                    {
                        id: action.post.id,
                        text: action.post.body,
                        likes: Math.floor(Math.random() * 100),
                        onLike: false
                    }
                ]
            }
        default:
            return state;
    }
}

export const actionCreators = {
    addPost: (valueOfInput: string) => ({ type: ADD_POST, postText: valueOfInput } as const),
    pressLike: (id: number) => ({ type: PRESS_LIKE, id } as const),
    getPost: (post: TApiPost) => ({ type: GET_POST, post } as const)
}

export const getPost = (): TThunkAction<TAction> => async (dispatch) => {
    const data = await postAPI.getRandomPost()
    dispatch(actionCreators.getPost(data))
}

export default profileReducer;


type TState = typeof initialState
type TAction = TReturnActionType<typeof actionCreators>
export type TPost = {
    id: number
    text: string
    likes: number
    onLike: boolean
}