import React, { FC } from 'react';
import './UsersList.css';
import { UserListGithub } from '../../types';
import { Link } from 'react-router-dom';
import { decOfNum } from '../utils';

interface PropsUserPage {
    users: UserListGithub[];
}

export const UsersList: FC<PropsUserPage> = ({ users }) => {
    return (
        <div className="users-list">
            {users?.map((item) => {
                return (
                    <section className="users-list__item" key={item.id}>
                        <div className="users-list__image-container">
                            <img className="users-list__image" src={item.avatar_url} alt="defunkt profile photo" />
                        </div>
                        <div className="users-list__content">
                            <h2 className="users-list__title">
                                <Link to={`/users/${item.login}`} className="link">
                                    {item.login}
                                </Link>
                                , {item.count}{' '}
                                {decOfNum(item.count ?? 0, ['репозиторий', 'репозитория', 'репозиториев'])}
                            </h2>
                            <p className="users-list__text">{item.company}</p>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};
