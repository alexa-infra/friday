import sqlalchemy as sa
from . import base


class TodoItem(base.Model):
    id = sa.Column(sa.Integer, primary_key=True)

    created = sa.Column(sa.DateTime, nullable=False, default=sa.func.now())
    updated = sa.Column(
        sa.DateTime, nullable=False, default=sa.func.now(), onupdate=sa.func.now()
    )
    deleted = sa.Column(sa.Boolean, nullable=False, default=False)

    parent_id = sa.Column(
        sa.Integer, sa.ForeignKey("todo_item.id", ondelete="CASCADE"), nullable=True
    )
    name = sa.Column(sa.Text, nullable=False)
    description = sa.Column(sa.Text, nullable=False)
    order = sa.Column(sa.Integer, nullable=False)
    dueto = sa.Column(sa.Date, nullable=True)
    done = sa.Column(sa.Boolean, nullable=False, default=False)
    focus = sa.Column(sa.Boolean, nullable=False, default=False)
    folder = sa.Column(sa.Boolean, nullable=False, default=False)
