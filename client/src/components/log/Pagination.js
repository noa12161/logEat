// LOG 컴포넌트용 페이지네이션

const Pagination = ({ countOfItems, itemsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(countOfItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="jcac">
      {pageNumbers &&
        pageNumbers.map((n, i) => (
          <li
            onClick={() => paginate(n)}
            className="pagination_number jcac"
            style={{
              cursor: 'pointer',
              padding: '7px',
              fontWeight: currentPage === n ? 'bold' : 'normal',
            }}
            key={i}
          >
            {n}
          </li>
        ))}
    </ul>
  );
};

export default Pagination;
