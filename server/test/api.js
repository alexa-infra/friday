
const request = require('supertest')
const path = require('path')
const assert = require('assert')
const Promise = require('bluebird')
const makeApp = require('../app').makeApp
const config = require('../config')
const db = require('../db')

const dbPath = path.join(__dirname, 'test.sqlite')

const makeServer = () => {
  const app = makeApp({
    database: {
      path: dbPath,
    }
  })
  return app
}

describe('database adapter', () => {
  it('should do basic CRUD', () => {
    return Promise.using(db.openDb(':memory:'), conn => {
      let id = null
      return db.links.create(conn)
        .then(() => db.links.insert(conn, {title: 'lalala', url: 'a.com'}))
        .then(data => {
          id = data.lastID
          return db.links.get(conn, id)
        })
        .then(data => {
          assert.equal('lalala', data.title)
          assert.equal('a.com', data.url)
          assert.equal(0, data.usage_count)
        })
        .then(() => db.links.update(conn, id, {title: 'bbbb', url: 'b.com'}))
        .then(() => db.links.get(conn, id))
        .then(data => {
          assert.equal('bbbb', data.title)
          assert.equal('b.com', data.url)
          assert.equal(0, data.usage_count)
        })
        .then(() => db.links.update_usage(conn, id))
        .then(() => db.links.get(conn, id))
        .then(data => {
          assert.equal('bbbb', data.title)
          assert.equal('b.com', data.url)
          assert.equal(1, data.usage_count)
        })
        .then(() => db.links.delete(conn, id))
        .then(() => db.links.get(conn, id))
        .then(data => {
          assert.equal(null, data)
        })
    })
  })
  it('should check pagination', () => {
    return Promise.using(db.openDb(':memory:'), (conn) => {
      return db.links.create(conn)
        .then(() => {
          const items = []
          for (let i=0; i<100; i++) {
            items.push(db.links.insert(conn, {title: 'item' + i, url: 'a.com'}))
          }
          return Promise.all(items)
        })
        .then(() => db.links.getPage(conn, 0, 10))
        .then(data => {
          assert.equal(100, data.count)
          assert.equal(10, data.rows.length)
        })
        .then(() => db.links.getPage(conn, 10, 10))
        .then(data => {
          assert.equal(100, data.count)
          assert.equal(10, data.rows.length)
        })
        .then(() => db.links.getPage(conn, 100, 10))
        .then(data => {
          assert.equal(100, data.count)
          assert.equal(0, data.rows.length)
        })
    })
  })
  it('should check pagination improved', () => {
    return Promise.using(db.openDb(':memory:'), (conn) => {
      return db.links.create(conn)
        .then(() => {
          const items = []
          for (let i=0; i<100; i++) {
            items.push(db.links.insert(conn, {title: 'item' + i, url: 'a.com'}))
          }
          return Promise.all(items)
        })
        .then(() => db.links.getPage2(conn, null, 10))
        .then(data => {
          assert.equal(10, data.length)
          return data[data.length - 1].last_access
        })
        .then(lastId => db.links.getPage2(conn, lastId, 10))
        .then(data => {
          assert.equal(10, data.length)
        })
    })
  })
})

describe('links api', () => {
  before(() => {
    return Promise.using(db.openDb(dbPath), (conn) => {
      return db.links.drop(conn)
        .then(() => db.links.create(conn))
    })
  })
  after(() => {
    return Promise.using(db.openDb(dbPath), (conn) => {
      return db.links.drop(conn)
    })
  })
  const app = makeServer()
  it('should work with empty database', () => {
    return request(app)
      .get('/api/links')
      .expect(200)
      .then((res) => {
        assert.ok('rows' in res.body)
        assert.ok('count' in res.body)
        assert.equal(0, res.body.rows.length)
        assert.equal(0, res.body.count)
      })
  })
  it('should work with empty database too', () => {
    return request(app)
      .get('/api/links/33')
      .expect(404)
  })
  it('should get 404 on missing item', () => {
    return request(app)
      .get('/api/links/33/redirect')
      .expect(404)
  })
  it('should create new item', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com"}')
      .expect(201)
      .then((res) => {
        assert.ok('id' in res.body)
        assert.ok('url' in res.body)
        assert.ok('title' in res.body)
        assert.equal('a.com', res.body.url)
      })
  })
  it('should create and retrive item', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com"}')
      .expect(201)
      .then((res) => {
        const id = res.body.id
        return request(app)
          .get('/api/links/' + id)
          .expect(200)
          .then((res) => {
            assert.ok('id' in res.body)
            assert.ok('url' in res.body)
            assert.ok('title' in res.body)
            assert.equal('a.com', res.body.url)
          })
      })
  })
  it('should create and update item', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com"}')
      .expect(201)
      .then((res) => {
        const id = res.body.id
        return request(app)
          .put('/api/links/' + id)
          .set('Content-Type', 'application/json')
          .send('{"title":"bbb","url":"b.com"}')
          .expect(200)
          .then((res) => {
            assert.ok('id' in res.body)
            assert.ok('url' in res.body)
            assert.ok('title' in res.body)
            assert.equal('b.com', res.body.url)
          })
      })
  })
  it('should create and delete item', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com"}')
      .expect(201)
      .then((res) => {
        const id = res.body.id
        return request(app)
          .delete('/api/links/' + id)
          .expect(204)
      })
  })
  it('should not create an item, due to incorrect json', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com}')
      .expect(400)
  })
  it('should not create an item, due to missing content-type', () => {
    return request(app)
      .post('/api/links')
      .send('{"title":"aaa","url":"a.com}')
      .expect(406)
  })
  it('should create and redirect', () => {
    return request(app)
      .post('/api/links')
      .set('Content-Type', 'application/json')
      .send('{"title":"aaa","url":"a.com"}')
      .expect(201)
      .then((res) => {
        const id = res.body.id
        return request(app)
          .get('/api/links/' + id + '/redirect')
          .expect(302)
      })
  })
  it('should check pagination', () => {
    let count = 0
    let len = 0
    return Promise.using(db.openDb(dbPath), (conn) => {
      return db.links.getAll(conn)
        .then((data) => {
          count = data.length
          len = Math.min(count, 10)
        })
    })
    .then(() => {
      return request(app)
        .get('/api/links')
        .expect(200)
        .then((res) => {
          assert.ok('rows' in res.body)
          assert.ok('count' in res.body)
          assert.equal(len, res.body.rows.length)
          assert.equal(count, res.body.count)
        })
    })
  })
})
