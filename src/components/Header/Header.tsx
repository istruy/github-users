import React, { FC, FormEvent, useEffect, useState } from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [headerValue, setHeaderValue] = useState('');

    useEffect(() => {
        setHeaderValue(
            location.pathname.includes('search')
                ? 'поиск'
                : /users\/\d{1,}/.test(location.pathname)
                ? location.pathname.split('/')[2]
                : ''
        );
    }, [location.pathname]);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchValue.trim().length) {
            return;
        }

        navigate(`/search?query=${searchValue}`, { replace: true });
    };

    return (
        <header className="header">
            <div className="container header__container">
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li className="header__navigation-list-item">
                            <a href="/" className="header__navigation-link">
                                Пользователи гитхаба
                            </a>
                        </li>
                        {headerValue ? (
                            <li className="header__navigation-list-item">
                                <a className="header__navigation-link header__navigation-link--user">{headerValue}</a>
                            </li>
                        ) : (
                            <></>
                        )}
                    </ul>
                </nav>

                <div className="header__search">
                    <form className="header__search-form" onSubmit={onSubmit}>
                        <input
                            type="search"
                            className="header__search-input"
                            placeholder="Поиск пользователя"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.currentTarget.value)}
                        />
                        <Link to={`/search?query=${searchValue}`} type="submit" className="header__search-button">
                            Найти
                        </Link>
                    </form>
                </div>
            </div>
        </header>
    );
};
