import { ToastContainer } from 'react-toastify';
import { RepositoryList } from './components/RepositoryList';

import './styles/global.scss';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <RepositoryList />
      <ToastContainer />
    </>
  );
}
