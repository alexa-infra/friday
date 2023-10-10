"""bookmark tags

Revision ID: 8bfbf4c2bf4e
Revises: ee613b52f8f5
Create Date: 2023-10-09 21:25:19.055823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "8bfbf4c2bf4e"
down_revision = "ee613b52f8f5"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "bookmark_tag",
        sa.Column("tag_id", sa.Integer(), nullable=False),
        sa.Column("bookmark_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["bookmark_id"],
            ["bookmark.id"],
        ),
        sa.ForeignKeyConstraint(
            ["tag_id"],
            ["tag.id"],
        ),
        sa.PrimaryKeyConstraint("tag_id", "bookmark_id"),
    )


def downgrade():
    op.drop_table("bookmark_tag")
