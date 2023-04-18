from markdown import Markdown
from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text, func
from sqlalchemy.orm import defer, joinedload, relationship

from friday.utils import MarkdownStrikeExt, utcnow

from .base import Model, db
from .tag import Tag, TagMixin

md = Markdown(extensions=["markdown.extensions.tables", MarkdownStrikeExt()])


class DocTag(Model):
    # pylint: disable=too-few-public-methods
    tag_id = Column(Integer, ForeignKey("tag.id"), primary_key=True)
    doc_id = Column(Integer, ForeignKey("doc.id"), primary_key=True)


class Doc(Model, TagMixin):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    text = Column(Text, nullable=True)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow, onupdate=utcnow)
    tags = relationship("Tag", secondary=DocTag.__table__)

    @property
    def html(self):
        if not self.text:
            return ""
        text = self.text
        if isinstance(text, bytes):
            text = text.decode("utf-8")
        return md.convert(text)

    @classmethod
    def query_list(cls):
        query = cls.query.options(defer(Doc.text), joinedload(Doc.tags))
        query = query.order_by(Doc.updated.desc())
        return query

    @classmethod
    def tag_cloud(cls):
        query = db.query(func.count("*").label("count"), Tag.name)
        query = query.select_from(DocTag)
        query = query.join(Tag)
        query = query.group_by(Tag.id)
        return query.all()
