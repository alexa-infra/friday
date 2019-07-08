import React from 'react';
import { NavLink } from 'react-router-dom';
import { TagsViewer, TagCloud } from './tags';
import { connect } from 'react-redux';
import { docs } from '../../actions';
import withOnLoad from '../../components/withOnLoad';
import Pagination from './pagination';


const DocsList = ({items, tagCloud, tag, filterByTag}) => (
  <div className="doc-page row justify-content-center">
    <div className="col col-md-10">
      <div className="controls">
        <NavLink to='/docs/new'>New doc</NavLink>
      </div>
      <TagCloud tags={tagCloud} current={tag} onClick={filterByTag} />
      {items.map(it => (
        <div className="row p-2" key={it.id}>
          <div className="col">
            <div className="row">
              <div className="col">
                <NavLink to={`/docs/${it.id}`}>
                  <b>{it.name}</b>
                </NavLink>
              </div>
              <div className="col text-right">
                <TagsViewer tags={it.tags} />
              </div>
            </div>
            <div className="row doc-controls">
              <div className="col">
                Created <i title={it.created.toISOString(true)}>{it.created.fromNow()}</i>
                Updated <i title={it.updated.toISOString(true)}>{it.updated.fromNow()}</i>
                <NavLink to={`/docs/${it.id}/edit`}>Edit</NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col">
          <Pagination />
        </div>
      </div>
    </div>
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
