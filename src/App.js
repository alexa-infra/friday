import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { linksSelector } from './selectors';
import { Grid, Row, Col } from 'react-bootstrap';


const Link = ({ item }) => (
  <a href={item.url}>{item.title}</a>
)

const LinkList = ({ items }) => (
  <Grid>
    <Row>
    {items.map(it => (
      <Col xs={6} sm={4} md={3} lg={2} key={it.id}>
        <Link item={it} />
      </Col>
    ))}
    </Row>
  </Grid>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LinkList items={this.props.links} />
      </div>
    );
  }
}

export default connect(linksSelector)(App);
