import React from 'react';

const Link = ({ id, url, title }) => (
  <a
    className="link"
    href={url}
    title={url}
  >
    {title}
  </a>
);

export const LinkList = ({ items }) => (
  <ul className="link-list flex flex-row flex-wrap justify-center">
    {items.map((it) => (
      <li className="m-2" key={it.id}>
        <Link {...it} />
      </li>
    ))}
  </ul>
);
