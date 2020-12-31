import React from 'react';
import { connect } from 'react-redux';
import { selectList, showEdit } from '../../features/links';

const Link = ({ id, url, title }) => (
  <a
    className="link"
    href={`/api/links/${id}/redirect`}
    title={url}
  >
    {title}
  </a>
);

const LinkEdit = ({ title, showEdit }) => (
  <button
    type="button"
    className="link-button"
    onClick={showEdit}
  >
    {title}
  </button>
);

let LinkList = ({ items, editMode, showEdit }) => (
  <ul className="link-list flex flex-row flex-wrap justify-center">
    {items.map((it) => (
      <li className="m-2" key={it.id}>
        { editMode ? <LinkEdit {...it} showEdit={() => showEdit(it)} />
          : <Link {...it} /> }
      </li>
    ))}
  </ul>
);

LinkList = connect(
  selectList,
  (dispatch) => ({
    showEdit: (item) => dispatch(showEdit(item)),
  }),
)(LinkList);

export default LinkList;
