import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Repository, UserGithub } from '../../types';
import { API_KEY } from '../../const';
import './UserProfilePage.css';
import { decOfNum } from '../utils';

export const UserProfilePage: FC = () => {
    const { id: idUser = 0 } = useParams();
    const [userInfo, setUserInfo] = useState<UserGithub>();
    const [repositoryInfo, setRepositoryInfo] = useState<Repository[]>();

    useEffect(() => {
        fetch(`https://api.github.com/users/${idUser}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${API_KEY}`,
            },
        })
            .then((response) => response.json())
            .then((response: UserGithub) =>
                setUserInfo({
                    id: response.id,
                    name: response.name,
                    avatar_url: response.avatar_url,
                    login: response.login,
                    blog: response.blog,
                    followers: response.followers,
                    following: response.following,
                })
            );

        fetch(`https://api.github.com/users/${idUser}/repos`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${API_KEY}`,
            },
        })
            .then((response) => response.json())
            .then((response: Repository[]) =>
                setRepositoryInfo(
                    response
                        .map((item) => {
                            return {
                                id: item.id,
                                name: item.name,
                                description: item.description,
                                ['html_url']: item.html_url,
                            };
                        })
                        .filter((item, index) => index < 6)
                )
            );
    }, []);

    const getRanks = (value: string | undefined) => {
        return value ? (Number(value) >= 1000 ? (Number(value) / 1000).toFixed(1) + 'k' : Number(value)) : '';
    };

    return (
        <>
            <main>
                <div className="container">
                    <section className="user-profile">
                        <div className="user-profile__image-container">
                            <img
                                className="user-profile__image"
                                src={userInfo?.avatar_url}
                                alt="defunkt profile photo"
                            />
                        </div>
                        <div className="user-profile__content">
                            <h1 className="user-profile__title">
                                {userInfo?.name}, <span className="user-profile__accent">{userInfo?.login}</span>
                            </h1>
                            <p className="user-profile__text">
                                <span className="user-profile__accent">{getRanks(userInfo?.followers)}</span>{' '}
                                {decOfNum(Number(userInfo?.followers), ['подписчик', 'подписчика', 'подписчиков'])}{' '}
                                <span className="user-profile__accent">{getRanks(userInfo?.following)}</span>{' '}
                                {decOfNum(Number(userInfo?.following), ['подписка', 'подписки', 'подписок'])}{' '}
                                <a href={userInfo?.blog} className="link">
                                    {userInfo?.blog}
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="repository-list">
                        <div className="repository-list__header">
                            <h2 className="repository-list__title">Репозитории</h2>
                            <a
                                href={`https://github.com/${userInfo?.login}?tab=repositories`}
                                className="link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Все репозитории
                            </a>
                        </div>

                        <div className="repository-list__container">
                            {repositoryInfo?.map((item) => (
                                <section className="repository-list__item" key={item.id}>
                                    <h3 className="repository-list__item-title">
                                        <a href={item['html_url']} className="link">
                                            {item.name}
                                        </a>
                                    </h3>
                                    <p className="repository-list__item-text">{item.description}</p>
                                </section>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};
