import './posts.css';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const Pagination = ({ username, tag, page, lastPage }) => {
  const navigate = useNavigate();

  const buildLink = (query) => {
    const queryString = qs.stringify(query);
    navigate(`?${queryString}`);
  };

  const showPaginateNum = () => {
    const nums = [];
    for (let i = 1; i <= lastPage; i++) {
      nums.push(
        <div
          className="pagination_num"
          onClick={() => buildLink({ username, tag, page: i })}
        >
          {i}
        </div>,
      );
    }
    return nums;
  };

  return (
    <div className="pagination_wrapper">
      <button
        disabled={page <= 1}
        onClick={() => buildLink({ username, tag, page: page - 1 })}
      >
        이전
      </button>
      {showPaginateNum()}
      <button
        disabled={page >= lastPage}
        onClick={() => buildLink({ username, tag, page: page + 1 })}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
