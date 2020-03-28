import React from 'react';
import { connect } from 'react-redux';
import { withOnLoad } from '../components';
import { getRecipes } from '../features/recipes';
import './kueche.scss';


const Image = (props) => {
  const left = Math.floor(props.cw / 2 - props.nw / 2);
  const top = Math.floor(props.ch / 2 - props.nh / 2);
  return (
    <div className="image" style={{width: props.cw, height: props.ch}}>
      <img src={props.url}
          style={{left: left, top: top}}
          width={props.nw}
          height={props.nh}
          alt={props.title}
          ></img>
      <div className="info">
        <div className="title">
          {props.title}
        </div>
      </div>
    </div>
  );
}

const ImageList = ({images, height}) => (
  <div className="image-row" style={{height: height}}>
    {images.map(it => (
      <Image key={'img' + it.id} {...it} />
    ))}
  </div>
);

class ImageBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      containerWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.setState({ containerWidth: Math.floor(this.el.clientWidth) });
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  handleResize(e) {
    this.setState({ containerWidth: Math.floor(this.el.clientWidth) });
  }
  render() {
    const {images, desiredWidth} = this.props;
    
    const containerWidth = this.state.containerWidth;
    const nColumns = Math.round(containerWidth / desiredWidth);
    const containerHeight = Math.floor(containerWidth / nColumns);
    const cellWidth = containerHeight;
    const cellHeight = containerHeight;

    const rows = images.reduce((acc, it, idx) => {
      const rowIdx = Math.floor(idx / nColumns);
      acc[rowIdx] = acc[rowIdx] ? [...acc[rowIdx], it] : [it];
      return acc;
    }, []);

    const updatedRows = rows.map(row => {
      const rescaledRow = row.map(it => {
        const {width: w, height: h} = it;
        let nh = Math.floor(cellWidth * h / w);
        let nw = cellWidth;
        if (nh < cellHeight) {
          nw = Math.floor(cellHeight * w / h);
          nh = cellHeight;
        }
        return {
          ...it,
          nw: nw,
          nh: nh,
          cw: cellWidth,
          ch: cellHeight
        };
      });
      return rescaledRow;
    });

    return (
      <div className="image-board" ref={c => (this.el = c)}>
        {updatedRows.map((row, idx) => (
          <ImageList key={'row' + idx} images={row} height={containerHeight} />
        ))}
      </div>
    );
  }
}

let App = ({ items }) => (
  <div className="App row">
    <div className="col">
      <ImageBoard images={items} desiredWidth={200} />
    </div>
  </div>
);

App = withOnLoad(App, props => props.onLoad());

App = connect(
  state => state.recipes,
  dispatch => ({
    onLoad: () => dispatch(getRecipes()),
  })
)(App);

export default App;
