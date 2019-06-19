import { connect } from 'react-redux';
import { bookmarks } from '../../actions';
import { Pagination } from '../../components';


export default connect(
  state => state.bookmarks,
  dispatch => {
    const reloadBookmarks = () => dispatch(bookmarks.getBookmarks());
    return {
      nextPage: () => dispatch(bookmarks.nextPage()).then(reloadBookmarks),
      prevPage: () => dispatch(bookmarks.prevPage()).then(reloadBookmarks),
      changePerPage: val => dispatch(bookmarks.perPage(val)).then(reloadBookmarks),
    };
  },
)(Pagination);
