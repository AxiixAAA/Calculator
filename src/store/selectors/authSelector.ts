import { TGlobalState } from "../reduxStore";

export const getIsLogged = (state: TGlobalState) => state.auth.isLogged;
export const getErrorMessage = (state: TGlobalState) => state.auth.errorMessage;
export const getCaptchaURL = (state: TGlobalState) => state.auth.captchaURL;
export const getAuthData = (state: TGlobalState) => state.auth;
export const getAuthUserId = (state: TGlobalState) => state.auth.id;
export const getNavMenuSelector = (state: TGlobalState) => state.auth.isNavMenu