import debounce from 'lodash.debounce'
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import crossIcon from '../../../assets/images/close.png'
import searchIcon from '../../../assets/images/search.png'
import styles from './SearchUserInput.module.css'

const SearchUserInput: FC<TProps> = ({ setSearchTerm, setCurrentPage, searchTerm, currentPage }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [value, setValue] = useState(searchParams.get('term') || searchTerm)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e?.target?.value
        setValue(value)
        setCurrentPage(1)
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setValue('')
        setSearchTerm('')
        setCurrentPage(1)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceHandle = useCallback(debounce(value => setSearchTerm(value), 500), [setSearchTerm])
    
    useEffect(() => {
        value === null || value === ''
        ? setSearchParams({})
        : setSearchParams({term: value})
    }, [value, currentPage, setSearchParams])
    
    useEffect(() => {
        value !== null && debounceHandle(value)
    }, [debounceHandle, searchParams, value])

    return (
        <form className={styles.form}>
            <label htmlFor='input' className={styles.label}>
                <img src={searchIcon} alt="Поиск" width='20px' />
            </label>
            <input type='text' className={styles.input} placeholder='Поиск по имени' value={value} onChange={handleChange} />
            {value !== null && value !== '' && value.length !== 0
                && <button type='button' onClick={handleClick} className={styles.button}>
                    <img src={crossIcon} alt="" width='20px' />
                </button>
            }
        </form>
    )
}

export default SearchUserInput


type TProps = {
    setSearchTerm: (term: string) => void
    setCurrentPage: (number: number) => void
    searchTerm: string
    currentPage: number
}
