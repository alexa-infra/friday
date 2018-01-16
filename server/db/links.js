const utcnow = require('./utils').utcnow

const create_sql = `
CREATE TABLE links (
  id INTEGER NOT NULL,
  url VARCHAR(200),
  title VARCHAR(50),
  usage_count INTEGER,
  last_access DATETIME,
  PRIMARY KEY (id)
);
CREATE INDEX last_access on links (last_access);
`

class LinkAdapter {
  constructor()
  {
  }
  create(db)
  {
    return db.exec(create_sql)
  }
  drop(db)
  {
    return db.run('drop table if exists links')
  }
  get(db, id)
  {
    return db.get('select * from links where id = ?', [id])
  }
  getAll(db)
  {
    return db.all('select * from links order by last_access desc')
  }
  getPage2(db, lastId, limit)
  {
    if (lastId)
      return db.all('select * from links where last_access < ? order by last_access desc limit ?',
        [lastId, limit])
    return db.all('select * from links order by last_access desc limit ?',
      [limit])
  }
  getPage(db, offset, limit)
  {
    let count = 0;
    return db.get('select count(*) as count from links')
      .then((row) => {
        count = row.count
        return db.all('select * from links order by last_access desc limit ?, ?',
          [offset, limit])
      })
      .then((rows) => {
        return {rows: rows, count: count}
      })
  }
  update(db, id, {title, url})
  {
    var self = this;
    return db.run('update links set url = $url, title = $title where id = $id', {
        $id: id,
        $title: title,
        $url: url,
      })
  }
  update_usage(db, id)
  {
    var self = this
    return db.run('update links set last_access = $now, usage_count = (select usage_count + 1 from links where id = $id) where id = $id', {
      $now: utcnow(),
      $id: id,
    })
  }
  insert(db, {title, url})
  {
    var self = this;
    return db.run('insert into links (title, url, last_access, usage_count) values ($title, $url, $now, $count)', {
      $now: utcnow(),
      $count: 0,
      $title: title,
      $url: url,
    })
  }
  delete(db, id)
  {
    return db.run('delete from links where id = $id', { $id: id })
  }
}

module.exports = new LinkAdapter()
