"""docs and doc tags

Revision ID: ae1528da307c
Revises: 83226bace0db
Create Date: 2018-05-27 08:31:35.381270

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ae1528da307c"
down_revision = "83226bace0db"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "doc",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("text", sa.Text(), nullable=True),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "tag",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_table(
        "doc_tag",
        sa.Column("tag_id", sa.Integer(), nullable=False),
        sa.Column("doc_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["doc_id"], ["doc.id"], ondelete="cascade"),
        sa.ForeignKeyConstraint(["tag_id"], ["tag.id"], ondelete="cascade"),
        sa.PrimaryKeyConstraint("tag_id", "doc_id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("doc_tag")
    op.drop_table("tag")
    op.drop_table("doc")
    # ### end Alembic commands ###
