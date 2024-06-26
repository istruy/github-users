import React, { FC, useEffect, useState } from 'react';
import { UserListGithub } from '../../types';
import { Header } from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
  const [users, setUsers] = useState<UserListGithub[]>([]);
  const [usersWithSize, setUsersWithSize] = useState<UserListGithub[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/users`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((response: UserListGithub[]) => {
        setUsers(response.filter((item, index) => index < 18));
      });
  }, []);

  useEffect(() => {
    const usersWithCountRep: UserListGithub[] = [];

    const repositoriesList = async () => {
      for (const user of users) {
        const getRes: Response = await fetch(`https://api.github.com/users/${user.login}/repos`, {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        });

        const getReposList = await getRes.json();
        usersWithCountRep.push({ ...user, count: getReposList.length });
      }
    };
    repositoriesList().then(() => setUsersWithSize(usersWithCountRep));
  }, [users]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/users/:id" element={<UserProfilePage />}></Route>
        <Route path="/users" element={<UsersPage users={usersWithSize} />}></Route>
        <Route path="/search" element={<UsersSearchPage />}></Route>
        <Route path="/" element={<UsersPage users={usersWithSize} />}></Route>
        <Route path="*" element={<UsersPage users={usersWithSize} />}></Route>
      </Routes>
    </>
  );
};
