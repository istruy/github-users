import React, { FC, useEffect, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UserListGithub } from '../../types';
import { API_KEY } from '../../const';
import { useLocation } from 'react-router-dom';

export const UsersSearchPage: FC = () => {
    const [searchUsers, setSearchUsers] = useState<UserListGithub[]>([]);
    const [searchUsersWithCount, setSearchUsersWithCount] = useState<UserListGithub[]>([]);
    const [userLogin, setUserLogin] = useState('');
    const location = useLocation();

    useEffect(() => {
        setUserLogin(new URLSearchParams(location.search).get('query') ?? '');
    }, [location.search]);

    useEffect(() => {
        fetch(`https://api.github.com/users`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${API_KEY}`,
            },
        })
            .then((response) => response.json())
            .then((response: UserListGithub[]) => {
                setSearchUsers(response.filter((item) => item.login.includes(userLogin)));
            });
    }, [userLogin]);

    useEffect(() => {
        const usersWithCountRep: UserListGithub[] = [];

        const repositoriesList = async () => {
            for (const user of searchUsers) {
                const getRes: Response = await fetch(`https://api.github.com/users/${user.login}/repos`, {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });

                const getReposList = await getRes.json();
                usersWithCountRep.push({ ...user, count: getReposList.length });
            }
        };
        repositoriesList().then(() => setSearchUsersWithCount(usersWithCountRep));
    }, [searchUsers]);

    return (
        <>
            <main>
                <div className="container">
                    <h1 className="title">
                        {searchUsersWithCount.length !== 0
                            ? 'Пользователи по запросу '
                            : 'Ничего не найдено по запросу '}{' '}
                        {userLogin}{' '}
                    </h1>
                    <UsersList users={searchUsersWithCount} />
                </div>
            </main>
        </>
    );
};
