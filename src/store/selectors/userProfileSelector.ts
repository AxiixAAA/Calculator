import { TGlobalState } from "../reduxStore";

export const getUserProfile = (state: TGlobalState) => state.userProfilePage.userProfile;
export const getStatus = (state: TGlobalState) => state.userProfilePage.status;
export const getUserId = (state: TGlobalState)=> state.userProfilePage.userProfile.userId;
