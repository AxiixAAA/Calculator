import React, { FC, useEffect, useState } from 'react'
import styles from './Paginator.module.css';

export const Paginator: FC<TProps> = ({ totalCount, pageSize, currentPage, setCurrentPage }) => {
    const PageButton = ({ disableDepend, funcParametr, innerText }) => {
        return (
            <button disabled={disableDepend}
                className={styles.button}
                onClick={() => setPortionNumber(funcParametr)}>{innerText}</button>
        )
    }

    const portionSize = 10;
    const totalPagesCount = Math.ceil(totalCount / pageSize);
    const [portionNumber, setPortionNumber] = useState(1);
    useEffect(() => {
        setPortionNumber(1)
    }, [totalCount])

    let totalPages = []
    if (totalCount) {
        for (let i = 1; i <= totalPagesCount; i++) {
            totalPages.push(i)
        }
    }

    let leftSidePortionNumber = (portionNumber - 1) * portionSize;
    let rightSidePortionNumber = portionNumber * portionSize;

    return (
        <div className={styles.wrapper}>
            <div className={styles.pagesWithButtons}>
                <PageButton disableDepend={portionNumber === 1}
                    funcParametr={portionNumber - 1}
                    innerText='◀' />
                <div className={styles.pageNumbersWrapper}>
                    {totalPages
                        .filter(p => p >= leftSidePortionNumber && p <= rightSidePortionNumber)
                        .map(item => {
                            return <span key={item} onClick={() => setCurrentPage(item)}
                                className={currentPage === item ? styles.activePage : styles.pageNumber}
                            >{item}</span>
                        })}
                </div>
                <PageButton disableDepend={portionNumber === totalPagesCount / portionSize}
                    funcParametr={portionNumber + 1}
                    innerText='▶' />
            </div>
            <div className={styles.buttonsWrapper}>
                    <PageButton disableDepend={portionNumber < 2}
                        funcParametr={1}
                        innerText='Первая' />
                    <PageButton disableDepend={portionNumber === totalPagesCount / portionSize}
                        funcParametr={totalPagesCount / portionSize}
                        innerText='Последняя' />
            </div>
            <div className={styles.inputPageWrapper}>
                <label htmlFor='pageInput' className={styles.label}>Введите страницу</label>
                <input className={styles.input} id="pagesInput" type="number" min={1} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (+event.target.value > totalPagesCount) event.target.value = totalPagesCount.toString();
                    if (event.target.value === null || +event.target.value < 1) event.target.value = '1';
                    setPortionNumber(Math.ceil(+event.target.value / portionSize))
                    setCurrentPage(+event.target.value)
                }} />
                <span className={styles.spanTotalPages}> / {totalPagesCount}</span>
            </div>
        </div>
    )
}


type TProps = {
    totalCount: number
    pageSize: number
    currentPage: number
    setCurrentPage: (number: number) => void
}
