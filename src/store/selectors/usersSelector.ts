import { createSelector } from 'reselect';
import { TGlobalState } from "../../store/reduxStore"

const getUsersPrime = (state: TGlobalState) => state.usersPage.users;

export const getUsers = createSelector(getUsersPrime, (users) => {
    // some big logic here
    return users;
})

export const getTotalCount = (state: TGlobalState) => state.usersPage.totalCount;
export const getPageSize = (state: TGlobalState) => state.usersPage.pageSize;
export const getCurrentPage = (state: TGlobalState)=> state.usersPage.currentPage;
export const getIsFetching = (state: TGlobalState) => state.usersPage.isFetching;
export const getInProgressFollow = (state: TGlobalState) => state.usersPage.inProgressFollow;
export const getSearchTerm = (state: TGlobalState) => state.usersPage.searchTerm;
