import math
import sqlalchemy as sa


def paginate(query, page, per_page):
    session = query.session
    total = (
        session.query(sa.func.count())
        .select_from(
            query.order_by(None).subquery()
        )
        .scalar()
    )

    if (page - 1) * per_page >= total:
        page = 1

    items = query.limit(per_page).offset((page - 1) * per_page).all()

    return Pagination(query, page, per_page, total, items)


class Pagination:
    def __init__(self, query, page, per_page, total, items):
        self.query = query
        self.page = page
        self.per_page = per_page
        self.total = total
        self.items = items

    @property
    def pages(self):
        """The total number of pages"""
        if self.per_page == 0:
            pages = 0
        else:
            pages = int(math.ceil(self.total / float(self.per_page)))
        return pages

    def prev(self):
        """Returns a :class:`Pagination` object for the previous page."""
        return paginate(self.query, self.page - 1, self.per_page)

    @property
    def prev_num(self):
        """Number of the previous page."""
        if not self.has_prev:
            return None
        return self.page - 1

    @property
    def has_prev(self):
        """True if a previous page exists"""
        return self.page > 1

    def next(self):
        """Returns a :class:`Pagination` object for the next page."""
        return paginate(self.query, self.page + 1, self.per_page)

    @property
    def has_next(self):
        """True if a next page exists."""
        return self.page < self.pages

    @property
    def next_num(self):
        """Number of the next page"""
        if not self.has_next:
            return None
        return self.page + 1
