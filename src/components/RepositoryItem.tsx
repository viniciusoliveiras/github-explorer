import { MdKeyboardArrowRight } from 'react-icons/md';

import userImg from '../assets/github.png';

interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
  avatar_url: string;
  login: string;
}

export function RepositoryItem({
  repository,
  avatar_url,
  login,
}: RepositoryItemProps) {
  const avatar = avatar_url;
  return (
    <a href={repository.html_url} className='repository-item' target='blank'>
      <div>
        <img src={avatar || userImg} alt='github' />
        <div>
          <strong>
            {repository.name}
          </strong>
          <p>{repository.description}</p>
        </div>
      </div>
      <MdKeyboardArrowRight fontSize='45px' color='#e1e1e8' />
    </a>
  );
}
