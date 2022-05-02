const Pagination = ({
  pageNumbers,
  page,
  lastPage,
  paginate,
  onClickArrow,
}) => {
  console.log(typeof page);
  return (
    <ul className="pagination_container jcac">
      <button
        className="pagination_button"
        onClick={() => onClickArrow(parseInt(page) - 1)}
        disabled={page <= 1}
      >
        이전
      </button>
      {pageNumbers.map((pageNum, i) => (
        <li
          onClick={() => paginate(pageNum)}
          className="pagination_number jcac"
          style={{
            fontWeight: parseInt(page) === pageNum ? 'bold' : 'normal',
          }}
          key={i}
        >
          {pageNum}
        </li>
      ))}
      <button
        className="pagination_button"
        onClick={() => onClickArrow(parseInt(page) + 1)}
        disabled={page >= lastPage}
      >
        다음
      </button>
    </ul>
  );
};

export default Pagination;
