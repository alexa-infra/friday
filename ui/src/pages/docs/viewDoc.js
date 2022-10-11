import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TagsViewer } from './tags';
import { Button } from '../../components';
import { useGetDocQuery, useGetDocHtmlQuery } from '../../api';

const createMarkup = (html) => ({ __html: html });

export const DocView = () => {
  const params = useParams();
  const { data, isLoading } = useGetDocQuery(params.id);
  const { data: html, isLoading: htmlIsLoading } = useGetDocHtmlQuery(params.id);
  if (isLoading || htmlIsLoading) {
    return null;
  }

  const { id, name, tags } = data;

  return (
    <div className="doc-page view">
      <div className="controls">
        <Link to={`/docs/${id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Link to="/docs">
          <Button>Back</Button>
        </Link>
      </div>
      <div className="header">
        <b>{name}</b>
      </div>
      <TagsViewer tags={tags} />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={createMarkup(html)}
      />
    </div>
  );
};
