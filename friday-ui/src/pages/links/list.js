import React from 'react';
import { connect } from 'react-redux';
import { links } from '../../actions';


const Link = ({ id, url, title }) => (
  <a href={`/api/links/${id}/redirect`} title={url}>{title}</a>
);

const LinkEdit = ({url, title, showEdit}) => (
  <a title={url} onClick={showEdit}>{title}</a>
);

let LinkList = ({ items, editMode, showEdit }) => (
  <ul className="link-list">
    {items.map(it => (
      <li key={it.id}>
        { editMode ? <LinkEdit {...it} showEdit={() => showEdit(it)} />
                   : <Link {...it} /> }
      </li>
    ))}
  </ul>
);

LinkList = connect(
  state => state.links,
  dispatch => ({
    showEdit: item => dispatch(links.showEdit(item)),
  })
)(LinkList);

export default LinkList;