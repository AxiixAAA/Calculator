import { TGlobalState } from "../reduxStore";

export const getNews = (state: TGlobalState)=> state.newsPage.news;
export const getIsFetching = (state: TGlobalState) => state.newsPage.isFetching;
export const getHasContent = (state: TGlobalState) => state.newsPage.hasContent;
export const getNextPageSelector = (state: TGlobalState) => state.newsPage.nextPage
export const getScrollFetchingSelector = (state: TGlobalState) => state.newsPage.scrollFetching
export const getCategoriesSelector = (state: TGlobalState) => state.newsPage.catregories