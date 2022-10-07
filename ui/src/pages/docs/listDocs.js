import React from 'react';
import dayjs from 'dayjs';
import { Link, NavLink } from 'react-router-dom';
import { TagsViewer, TagCloud } from './tags';
import Button from '../../components/button';
import { Pagination } from '../../components';
import { useGetDocsQuery, useGetTagListQuery } from '../../api';

const DocItem = ({ id, tags, name, created, updated }) => {
  const createdDate = dayjs(created);
  const updatedDate = dayjs(updated);
  return (
    <div className="row p-2">
      <div className="col">
        <div className="row">
          <div className="col">
            <NavLink to={`/docs/${id}`}>
              <b>{name}</b>
            </NavLink>
          </div>
          <div className="col text-right">
            <TagsViewer tags={tags} />
          </div>
        </div>
        <div className="row doc-controls">
          <div className="col">
            Created
            {' '}
            <i title={createdDate.toISOString(true)}>{createdDate.fromNow()}</i>
            {' '}
            Updated
            {' '}
            <i title={updatedDate.toISOString(true)}>{updatedDate.fromNow()}</i>
            {' '}
            <NavLink to={`/docs/${id}/edit`}>Edit</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

const DocsList = () => {
  const { data: tagCloud, isLoading: tagsIsLoading } = useGetTagListQuery();
  const [params, setParams] = React.useState({
    tag: null,
    page: 1,
    pages: 0,
    per_page: 10,
  });
  const setCurrentTag = (tag) =>
    setParams(x => ({
      ...x,
      tag,
    }));
  const nextPage = () =>
    setParams(x => ({
      ...x,
      page: x.page < x.pages ? x.page + 1 : x.page,
    }));
  const prevPage = () =>
    setParams(x => ({
      ...x,
      page: x.page > 0 ? x.page - 1 : x.page,
    }));
  const changePerPage = per_page =>
    setParams(x => ({
      ...x,
      per_page,
    }));
  const { data, isLoading } = useGetDocsQuery(params);
  React.useEffect(() => {
    if (data) {
      const { page, pages, per_page } = data;
      setParams(x => ({
        ...x,
        page,
        pages,
        per_page,
      }));
    }
  }, [data]);
  return (
    <div className="doc-page md:w-8/12 md:mx-auto">
      <div className="col col-md-10">
        <div className="controls">
          <Link to="/docs/new">
            <Button>New doc</Button>
          </Link>
        </div>
        <TagCloud tags={tagsIsLoading ? [] : tagCloud} current={params.tag} onClick={setCurrentTag} />
        {(isLoading ? [] : data.items).map((it) => (
          <DocItem key={it.id} {...it} />
        ))}
        <div className="row">
          <div className="col">
            <Pagination
              {...params}
              nextPage={nextPage}
              prevPage={prevPage}
              changePerPage={changePerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsList;
