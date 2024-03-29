"""empty message

Revision ID: 3dbc4aebf445
Revises: 813e984baf91
Create Date: 2018-05-03 09:16:19.763812

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "3dbc4aebf445"
down_revision = "813e984baf91"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "event",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("icon", sa.Text(), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column(
            "repeat",
            sa.Enum("daily", "weekly", "biweekly", "monthly", "annually", name="repeat"),
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("event")
    # ### end Alembic commands ###
