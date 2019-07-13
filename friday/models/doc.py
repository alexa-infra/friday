from sqlalchemy import Table, Column, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from markdown import Markdown
from friday.utils import utcnow, MarkdownStrikeExt
from . import db
from .tag import Tag, TagMixin


md = Markdown(extensions=['markdown.extensions.tables', MarkdownStrikeExt()])


DocTag = Table('doc_tag', db.metadata,
               Column('tag_id', Integer, ForeignKey('tag.id'), primary_key=True),
               Column('doc_id', Integer, ForeignKey('doc.id'), primary_key=True))


class Doc(db.Model, TagMixin):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    text = Column(Text, nullable=True)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    tags = relationship('Tag', secondary=DocTag)

    @property
    def html(self):
        if not self.text:
            return ''
        text = self.text
        if isinstance(text, bytes):
            text = text.decode('utf-8')
        return md.convert(text)

    @classmethod
    def query_list(cls):
        return (
            cls.query.options(db.defer(Doc.text),
                              db.joinedload(Doc.tags))
            .order_by(Doc.updated.desc())
        )

    @classmethod
    def tag_cloud(cls):
        query = db.session.query(func.count('*').label('count'), Tag.name)
        query = query.select_from(DocTag)
        query = query.join(Tag)
        query = query.group_by(Tag.id)
        return query.all()
