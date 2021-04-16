import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

import logoImg from '../assets/logo.svg';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

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

      <div className='searchRepo'>
        <input
          type='text'
          name='searchRepo'
          id='searchRepo'
          placeholder='Digite aqui'
        />
        <button type='button'>Pesquisar</button>
      </div>

      {repositories.map((repository) => {
        return <RepositoryItem key={repository.name} repository={repository} />;
      })}
    </section>
  );
}
