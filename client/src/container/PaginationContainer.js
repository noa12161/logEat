import qs from 'qs';
import Pagination from '../components/posts/Pagination';

const PaginationContainer = ({ query, lastPage }) => {
  const { username, tag, page = 1 } = query;

  return (
    <Pagination username={username} tag={tag} page={page} lastPage={lastPage} />
  );
};

export default PaginationContainer;
