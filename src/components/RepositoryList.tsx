import { useState, useEffect, FormEvent } from 'react';
import Loader from 'react-loader-spinner';

import '../styles/repositories.scss';

import { RepositoryItem } from './RepositoryItem';
import { api } from '../services/api';

import logoImg from '../assets/logo.svg';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

interface UserInfos {
  avatar_url?: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState(
    'https://avatars.githubusercontent.com/u/64497059?v=4'
  );
  const [login, setLogin] = useState('viniciusoliveiras');
  const [isLoading, setLoading] = useState(false);

  async function handleUserSearch(event: FormEvent) {
    event.preventDefault();

    setUsername('');
    setLoading(true);
    setRepositories([]);
    
    const responseRepos = await api.get(`${username}/repos`);
    const responseData = await api.get(`${username}`);

    setTimeout(() => {
      setLoading(false);
      setRepositories(responseRepos.data);
      setUserAvatar(responseData.data.avatar_url);
      setLogin(responseData.data.login);
    }, 800);
  }

  // useEffect(() => {
  //   fetch(
  //     'https://api.github.com/users/viniciusoliveiras/repos'
  //   ).then((response) => response.json().then((data) => setRepositories(data)));
  // }, []);

  return (
    <section className='repository-list'>
      <img src={logoImg} alt='teste' />

      <h1>
        Explore repositórios <br /> no Github.
      </h1>

      <form className='searchRepo' onSubmit={handleUserSearch}>
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

      {isLoading && (
        <div className='loader'>
          <Loader
            type='RevolvingDot'
            color='#04d361'
            height={100}
            width={100}
          />
        </div>
      )}

      {repositories &&
        repositories.map((repository) => {
          return (
            <RepositoryItem
              key={repository.name}
              repository={repository}
              avatar_url={userAvatar}
              login={login}
            />
          );
        })}
    </section>
  );
}
