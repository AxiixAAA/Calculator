import { TGlobalState } from "../reduxStore";

export const getOpponentsSelector = (state: TGlobalState) => state.dialogsPage.opponents
export const getOpponentMessagesSelector = (state: TGlobalState) => state.dialogsPage.messages
export const getCurrentOpponentSelector = (state: TGlobalState) => state.dialogsPage.currentOpponent