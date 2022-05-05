import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../../store/reducers/newsReducer'
import { getCategoriesSelector } from '../../../store/selectors/newsSelector'
import styles from './NewsCategories.module.css'

export const NewsCategories = () => {
    const dispatch = useDispatch()
    const categoriesRedux = useSelector(getCategoriesSelector)
    const [categories, setCategories] = useState(categoriesRedux)
    const [sport, setSport] = useState(false)
    const [techno, setTechno] = useState(true)
    const [top, setTop] = useState(false)

    useEffect(() => {
        dispatch(actionCreators.setCategories(categories))
    }, [categories, dispatch])

    const handleSportClick = () => {
        setCategories([...categories, 'sports'])
        setSport(true)
    }
    const handleAntiSportClick = () => {
        if (categoriesRedux.length !== 1) {
            setCategories(categories.filter(c => c !== 'sports'))
            setSport(false)
        }
    }

    const handleTechnoClick = () => {
        setCategories([...categories, 'technology'])
        setTechno(true)
    }
    const handleAntiTechnoClick = () => {
        if (categoriesRedux.length !== 1) {
            setCategories(categories.filter(c => c !== 'technology'))
            setTechno(false)
        }
    }

    const handleTopClick = () => {
        setCategories([...categories, 'top'])
        setTop(true)
    }
    const handleAntiTopClick = () => {
        if (categoriesRedux.length !== 1) {
            setCategories(categories.filter(c => c !== 'top'))
            setTop(false)
        }
    }

    return (
        <div className={styles.wrapper}>
            {!sport
                ? <div onClick={handleSportClick} className={styles.disactive}>Спорт</div>
                : <div onClick={handleAntiSportClick} className={styles.active}>Спорт</div>}
            {!techno
                ? <div onClick={handleTechnoClick} className={styles.disactive}>Технологии</div>
                : <div onClick={handleAntiTechnoClick} className={styles.active}>Технологии</div>}
            {!top
                ? <div onClick={handleTopClick} className={styles.disactive}>Общие</div>
                : <div onClick={handleAntiTopClick} className={styles.active}>Общие</div>}
        </div>
    )
}
