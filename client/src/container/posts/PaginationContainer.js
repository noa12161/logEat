import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = ({ query, lastPage }) => {
  const navigate = useNavigate();
  const { username, tag, page = 1 } = query;
  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const onClickArrow = (page) => {
    const queryString = qs.stringify({ username, tag, page });
    navigate(`/posts?${queryString}`);
  };

  const paginate = (page) => {
    const queryString = qs.stringify({ username, tag, page });
    navigate(`/posts?${queryString}`);
  };

  return (
    <Pagination
      pageNumbers={pageNumbers}
      page={page}
      lastPage={lastPage}
      onClickArrow={onClickArrow}
      paginate={paginate}
    />
  );
};

export default PaginationContainer;
