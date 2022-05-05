import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { TCategory, TNews } from "../../api/newsAPI";
import { Preloader } from "../../components/common/Preloader/Preloader";
import { getContent, getNewsByCategory, getNewsThunk } from '../../store/reducers/newsReducer';
import { TGlobalState } from "../../store/reduxStore";
import { getCategoriesSelector, getHasContent, getIsFetching, getNews, getNextPageSelector, getScrollFetchingSelector } from "../../store/selectors/newsSelector";
import News from './News';

const NewsContainer: FC<TProps> = ({ getNewsThunk, getNewsByCategory, isFetching, news, hasContent, getContent, nextPage, scrollFetching, categories }) => {
    useEffect(() => {
        if (scrollFetching) {
            getNewsThunk(nextPage, categories)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollFetching])

    useEffect(() => {
        getNewsByCategory(categories)
    }, [categories, getNewsByCategory])

    return (
        <>
            {isFetching
                ? <Preloader />
                : <News
                    news={news}
                    hasContent={hasContent}
                    getContent={getContent} />}
        </>
    )
}

const mapStateToProps = (state: TGlobalState) => ({
    news: getNews(state),
    isFetching: getIsFetching(state),
    hasContent: getHasContent(state),
    nextPage: getNextPageSelector(state),
    scrollFetching: getScrollFetchingSelector(state),
    categories: getCategoriesSelector(state)
})

export default connect(mapStateToProps, { getNewsThunk, getContent, getNewsByCategory })(NewsContainer);


type TProps = {
    isFetching: boolean
    news: TNews[]
    hasContent: string[]
    nextPage: number
    scrollFetching: boolean
    categories: TCategory[]
    getContent: () => void
    getNewsThunk: (page: number, categories: TCategory[]) => Promise<void>
    getNewsByCategory: (categories: TCategory[]) => Promise<void>
}