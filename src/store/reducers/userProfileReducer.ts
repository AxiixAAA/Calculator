import { TReturnActionType } from './../reduxStore';
import { profileAPI } from "../../api/profileAPI";
import { TPhotos, TSetProfileData, TThunkAction, TUserProfile } from "../../types/types";

const GET_USER_PROFILE = 'userProfile/GET-USER-PROFILE',
    GET_STATUS = 'userProfile/GET-STATUS',
    SET_PHOTO = 'userProfile/SET-PHOTO';

const inititalState = {
    userProfile: null as TUserProfile | null,
    status: ''
}

type TState = typeof inititalState
type TAction = TReturnActionType<typeof actionCreators>

const UserProfileReducer = (state = inititalState, action:TAction) :TState => {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case GET_STATUS:
            return {
                ...state,
                status: action.statusMessage
            }
        case SET_PHOTO:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    photos: action.photoFiles
                }
            }
        default:
            return state;
    }
}

const actionCreators = {
    getUserProfile: (userProfile: TUserProfile) => ({ type: GET_USER_PROFILE, userProfile }) as const,
    getStatus: (statusMessage: string) => ({ type: GET_STATUS, statusMessage }) as const,
    setPhotoSucces: (photoFiles: TPhotos) => ({ type: SET_PHOTO, photoFiles }) as const
}

export const getUserProfileThunk = (userId: number): TThunk => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(actionCreators.getUserProfile(data))
        })
        profileAPI.getStatus(userId).then(data => {
            dispatch(actionCreators.getStatus(data))
        })
    }
}

export const updateStatusThunk = (statusMessage: string): TThunk => {
    return (dispatch) => {
        profileAPI.setStatus(statusMessage).then(data => {
            data.resultCode === 0 && dispatch(actionCreators.getStatus(statusMessage))
        })
    }
}

export const getStatusThunk = (userId: number): TThunk => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(data => {
            dispatch(actionCreators.getStatus(data))
        })
    }
}

export const setProfileDataThunk = (profileData: TSetProfileData): TThunk => async (dispatch, getState) => {
    const userId: number = getState().auth.id;
    const data = await profileAPI.setProfile(profileData);
    data.resultCode === 0 && dispatch(getUserProfileThunk(userId));
}

export const setPhoto = (photoFile: File): TThunk => async (dispatch) => {
    const data = await profileAPI.setPhoto(photoFile);
    data.resultCode === 0 && dispatch(actionCreators.setPhotoSucces(data.data.photos));
}

export default UserProfileReducer;

type TThunk = TThunkAction<TAction, void>
