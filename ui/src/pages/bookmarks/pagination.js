import { connect } from 'react-redux';
import {
  selectPagination, nextPage, prevPage, setPerPage,
} from '../../features/bookmarks';
import { Pagination } from '../../components';

export default connect(
  selectPagination,
  (dispatch) => ({
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage()),
    changePerPage: (val) => dispatch(setPerPage(val)),
  }),
)(Pagination);
