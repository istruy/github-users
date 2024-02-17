import React, { FC } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { UserListGithub } from '../../types';

interface PropsUserPage {
    users: UserListGithub[];
}

export const UsersPage: FC<PropsUserPage> = ({ users }) => {
    return (
        <>
            <main>
                <div className="container">
                    <UsersList users={users} />
                </div>
            </main>
        </>
    );
};
