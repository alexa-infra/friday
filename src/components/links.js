import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { linksSelector } from '../selectors'


const Link = ({ id, url, title, onClick }) => (
  <a href={`/api/links/${id}/redirect`} alt={url}>{title}</a>
)

const LinkList = ({ links }) => (
  <Grid>
    <Row>
    {links.map(it => (
      <Col xs={6} sm={4} md={3} lg={2} key={it.id}>
        <Link {...it} />
      </Col>
    ))}
    </Row>
  </Grid>
)

export default connect(linksSelector)(LinkList)