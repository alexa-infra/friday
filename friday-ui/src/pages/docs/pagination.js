import { connect } from 'react-redux';
import { docs } from '../../actions';
import { Pagination } from '../../components';


export default connect(
  state => state.docs,
  dispatch => {
    const reloadDocs = () => dispatch(docs.getDocs());
    return {
      nextPage: () => dispatch(docs.nextPage()).then(reloadDocs),
      prevPage: () => dispatch(docs.prevPage()).then(reloadDocs),
      changePerPage: val => dispatch(docs.perPage(val)).then(reloadDocs),
    };
  },
)(Pagination);
