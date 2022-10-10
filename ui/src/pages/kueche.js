import React from 'react';
import { useGetRecipeListQuery } from '../api';

const getRandomElement = (arr) => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

const convert = (it) => {
  const title = getRandomElement(it.names);
  const img = getRandomElement(it.images);
  return {
    ...it,
    ...img,
    title,
  };
};

const remap = (items) => shuffle(items.map(convert));

const Image = (props) => {
  const left = Math.floor(props.cw / 2 - props.nw / 2);
  const top = Math.floor(props.ch / 2 - props.nh / 2);
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: props.cw, height: props.ch }}
    >
      <img
        className="absolute max-w-none"
        src={props.url}
        style={{ left, top }}
        width={props.nw}
        height={props.nh}
        alt={props.title}
      />
      <div className="text-white w-full absolute bottom-0 left-0 text-center">
        {props.title}
      </div>
    </div>
  );
};

const ImageList = ({ images, height }) => (
  <div className="flex w-full" style={{ height }}>
    {images.map((it) => (
      <Image key={`img${it.id}`} {...it} />
    ))}
  </div>
);

const ImageBoard = ({ images, desiredWidth }) => {
  const ref = React.useRef();
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    const handleResize = () => {
      setContainerWidth(Math.floor(ref.current.clientWidth));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize, false);
  }, []);

  const nColumns = Math.round(containerWidth / desiredWidth);
  const containerHeight = Math.floor(containerWidth / nColumns);
  const cellWidth = containerHeight;
  const cellHeight = containerHeight;

  const rows = images.reduce((acc, it, idx) => {
    const rowIdx = Math.floor(idx / nColumns);
    acc[rowIdx] = acc[rowIdx] ? [...acc[rowIdx], it] : [it];
    return acc;
  }, []);

  const updatedRows = rows.map((row) => {
    const rescaledRow = row.map((it) => {
      const { width: w, height: h } = it;
      let nh = Math.floor((cellWidth * h) / w);
      let nw = cellWidth;
      if (nh < cellHeight) {
        nw = Math.floor((cellHeight * w) / h);
        nh = cellHeight;
      }
      return {
        ...it,
        nw,
        nh,
        cw: cellWidth,
        ch: cellHeight,
      };
    });
    return rescaledRow;
  });

  return (
    <div className="w-full" ref={ref}>
      {updatedRows.map((row, idx) => (
        <ImageList key={`row${idx}`} images={row} height={containerHeight} />
      ))}
    </div>
  );
};

export const RecipesPage = () => {
  const { data } = useGetRecipeListQuery();
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    if (data) {
      setItems(remap(data));
    }
  }, [data]);
  return (
    <div className="App row">
      <div className="col">
        <ImageBoard images={items} desiredWidth={200} />
      </div>
    </div>
  );
};
