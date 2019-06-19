import React from 'react';
import { NavLink } from 'react-router-dom';
import { TagsViewer, TagCloud } from './tags';
import { connect } from 'react-redux';
import { docs } from '../../actions';
import withOnLoad from '../../components/withOnLoad';
import Pagination from './pagination';


const DocsList = ({items, tagCloud, tag, filterByTag}) => (
  <div className="doc-page list">
    <div className="controls">
      <NavLink to='/docs/new'>New doc</NavLink>
    </div>
    <TagCloud tags={tagCloud} current={tag} onClick={filterByTag} />
    {items.map(it => (
      <div className="row" key={it.id}>
        <div className="doc">
          <NavLink to={`/docs/${it.id}`}>
            <b>{it.name}</b>
          </NavLink>
          <TagsViewer tags={it.tags} />
        </div>
        <div className="doc-controls">
          <div className="item">
            Created <i title={it.created.toISOString(true)}>{it.created.fromNow()}</i>
          </div>
          <div className="item">
            Updated <i title={it.updated.toISOString(true)}>{it.updated.fromNow()}</i>
          </div>
          <NavLink to={`/docs/${it.id}/edit`}>Edit</NavLink>
        </div>
      </div>
    ))}
    <Pagination />
  </div>
);

let DocsListContainer = withOnLoad(DocsList, props => props.loadAll());
DocsListContainer = connect(
  state => state.docs,
  dispatch => ({
    loadAll: () => dispatch(docs.getDocs()).then(
      () => dispatch(docs.getDocsTagCloud())
    ),
    filterByTag: tag => dispatch(docs.filterByTag(tag)).then(
      () => dispatch(docs.getDocs())
    ),
  }),
)(DocsListContainer);

export default DocsListContainer;
