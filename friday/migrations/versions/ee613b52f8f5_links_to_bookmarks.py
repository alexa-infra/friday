"""links to bookmarks

Revision ID: ee613b52f8f5
Revises: 77ec4552553c
Create Date: 2022-10-01 07:47:01.262528

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy import orm
from sqlalchemy.ext.declarative import declarative_base

from friday.utils import get_domain, get_slug, utcnow

# revision identifiers, used by Alembic.
revision = "ee613b52f8f5"
down_revision = "77ec4552553c"
branch_labels = None
depends_on = None


Base = declarative_base()


class Bookmark(Base):
    __tablename__ = "bookmark"

    id = sa.Column(sa.Integer, primary_key=True)
    url = sa.Column(sa.Text, nullable=False)
    title = sa.Column(sa.Text, nullable=False)
    created = sa.Column(sa.DateTime, nullable=False)
    updated = sa.Column(sa.DateTime, nullable=False)
    readed = sa.Column(sa.Boolean, nullable=False, default=False)
    slug = sa.Column(sa.Text)
    domain = sa.Column(sa.Text)
    favorite = sa.Column(sa.Boolean, default=False)


class Link(Base):
    __tablename__ = "link"

    id = sa.Column(sa.Integer, primary_key=True)
    url = sa.Column(sa.Text)
    title = sa.Column(sa.Text)
    usage_count = sa.Column(sa.Integer)
    last_access = sa.Column(sa.DateTime)


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("bookmark", sa.Column("favorite", sa.Boolean(), nullable=True))

    bind = op.get_bind()
    session = orm.Session(bind=bind)

    links = session.query(Link)
    for link in links:
        last_access = link.last_access if link.last_access else utcnow()
        domain = get_domain(link.url)
        slug = get_slug(link.title, domain)
        bookmark = Bookmark(
            url=link.url,
            title=link.title,
            created=utcnow(),
            updated=last_access,
            readed=True,
            slug=slug,
            domain=domain,
            favorite=True,
        )
        session.add(bookmark)
    session.commit()

    op.drop_table("link")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "link",
        sa.Column("id", sa.INTEGER(), nullable=False),
        sa.Column("url", sa.TEXT(), nullable=True),
        sa.Column("title", sa.TEXT(), nullable=True),
        sa.Column("usage_count", sa.INTEGER(), nullable=True),
        sa.Column("last_access", sa.DATETIME(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    bind = op.get_bind()
    session = orm.Session(bind=bind)

    bookmarks = session.query(Bookmark).filter(Bookmark.favorite)
    for bookmark in bookmarks:
        link = Link(
            url=bookmark.url,
            title=bookmark.title,
            last_access=bookmark.updated,
            usage_count=0,
        )
        session.add(link)
        session.delete(bookmark)
    session.commit()

    op.drop_column("bookmark", "favorite")
    # ### end Alembic commands ###
