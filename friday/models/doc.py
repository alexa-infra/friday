from sqlalchemy import Table, Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from markdown import Markdown
from friday.utils import utcnow, MarkdownStrikeExt
from . import db
from .tag import TagMixin


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
        return md.convert(self.text.decode('utf-8'))

    @classmethod
    def query_list(cls):
        return (
            cls.query.options(db.defer(Doc.text),
                              db.joinedload(Doc.tags))
            .order_by(Doc.updated.desc())
        )
