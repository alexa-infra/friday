"""empty message

Revision ID: dd10488d644b
Revises: 
Create Date: 2018-04-20 16:56:24.026969

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "dd10488d644b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "link",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("title", sa.Text(), nullable=True),
        sa.Column("usage_count", sa.Integer(), nullable=True),
        sa.Column("last_access", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("link")
    # ### end Alembic commands ###
