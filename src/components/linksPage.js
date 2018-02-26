import React from 'react'
import { connect } from 'react-redux'
import { linksSelector } from '../selectors'
import './linksPage.css'


const Link = ({ id, url, title }) => (
  <a href={`/api/links/${id}/redirect`} alt={url}>{title}</a>
)

const LinkList = ({ links }) => (
  <ul className="link-list">
    {links.map(it => (
      <li key={it.id}>
        <Link {...it} />
      </li>
    ))}
  </ul>
)

export default connect(linksSelector)(LinkList)
