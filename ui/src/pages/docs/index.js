import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocNew from './newDoc';
import DocEdit from './editDoc';
import DocView from './viewDoc';
import DocsList from './listDocs';
import './github-markdown.css';

const DocsPage = () => (
  <Routes>
    <Route path="new" element={
      <DocNew />
    } />
    <Route path=":id/edit" element={
      <DocEdit />
    } />
    <Route path=":id" element={
      <DocView />
    } />
    <Route path="" element={
      <DocsList />
    } />
  </Routes>
);

export default DocsPage;
