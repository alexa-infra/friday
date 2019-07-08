import React from 'react';
import { connect } from 'react-redux';
import { links } from '../../actions';


const Link = ({ id, url, title }) => (
  <a
    className="link"
    href={`/api/links/${id}/redirect`}
    title={url}>
      {title}
  </a>
);

const LinkEdit = ({url, title, showEdit}) => (
  <button
    type="button"
    className="link-button"
    onClick={showEdit}>
      {title}
  </button>
);

let LinkList = ({ items, editMode, showEdit }) => (
  <div className="row justify-content-center">
    <div className="col col-md-10">
      <ul className="link-list">
        {items.map(it => (
          <li key={it.id}>
            { editMode ? <LinkEdit {...it} showEdit={() => showEdit(it)} />
                       : <Link {...it} /> }
          </li>
        ))}
      </ul>
    </div>
  </div>
);

LinkList = connect(
  state => state.links,
  dispatch => ({
    showEdit: item => dispatch(links.showEdit(item)),
  })
)(LinkList);

export default LinkList;
