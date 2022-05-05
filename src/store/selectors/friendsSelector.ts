import { TGlobalState } from "../reduxStore";

export const getFriends = (state: TGlobalState) => state.friendsSection.friends
export const getTotalFriends = (state: TGlobalState) => state.friendsSection.totalFriends