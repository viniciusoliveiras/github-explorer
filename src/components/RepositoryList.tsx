import { useState, useEffect, FormEvent } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

import logoImg from '../assets/logo.svg';
import { api } from '../services/api';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

interface UserInfos {
  avatar_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState(
    'https://avatars.githubusercontent.com/u/64497059?v=4'
  );
  const [userName, setUserName] = useState('viniciusoliveiras');

  function handleSearchUserRepos(event: FormEvent) {
    event.preventDefault();
    searchUser();
    setUsername('');
  }

  function searchUser() {
    fetch(`https://api.github.com/users/${username}/repos`).then((response) =>
      response.json().then((data) => setRepositories(data))
    );

    api
      .get(`${username}`)
      .then((response) => setUserAvatar(response.data.avatar_url));

    api.get(`${username}`).then((response) => setUserName(response.data.login));
  }

  useEffect(() => {
    fetch(
      'https://api.github.com/users/viniciusoliveiras/repos'
    ).then((response) => response.json().then((data) => setRepositories(data)));
  }, []);

  return (
    <section className='repository-list'>
      <img src={logoImg} alt='teste' />

      <h1>
        Explore repositórios <br /> no Github.
      </h1>

      <form className='searchRepo' onSubmit={handleSearchUserRepos}>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Digite aqui o nome do usuário'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button type='submit'>Pesquisar</button>
      </form>

      {repositories.map((repository) => {
        return (
          <RepositoryItem
            key={repository.name}
            repository={repository}
            avatar_url={userAvatar}
            login={userName}
          />
        );
      })}
    </section>
  );
}
