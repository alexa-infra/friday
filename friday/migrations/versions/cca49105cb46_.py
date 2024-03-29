"""empty message

Revision ID: cca49105cb46
Revises: b18330f1a80a
Create Date: 2018-05-22 18:21:55.058824

"""
from urllib.parse import unquote

import sqlalchemy as sa
from alembic import op
from slugify import slugify
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session as BaseSession
from sqlalchemy.orm import sessionmaker

Session = sessionmaker()
Base = declarative_base()


class Bookmark(Base):
    __tablename__ = "bookmark"

    id = sa.Column(sa.Integer, primary_key=True)
    url = sa.Column(sa.Text, nullable=False)
    title = sa.Column(sa.Text, nullable=False)
    slug = sa.Column(sa.Text, nullable=True)

    @property
    def _slug(self):
        unquoted_url = unquote(self.url)
        clean_url = unquoted_url.strip("http://").strip("https://")
        txt = " ".join(
            filter(
                None,
                [
                    clean_url,
                    self.title,
                ],
            )
        )
        return slugify(txt, separator=" ")


# revision identifiers, used by Alembic.
revision = "cca49105cb46"
down_revision = "b18330f1a80a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("bookmark", sa.Column("slug", sa.Text(), nullable=True))
    # ### end Alembic commands ###

    bind = op.get_bind()
    session = Session(bind=bind)
    for b in session.query(Bookmark):
        b.slug = b._slug
        session.add(b)
    session.commit()


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("bookmark", "slug")
    # ### end Alembic commands ###
