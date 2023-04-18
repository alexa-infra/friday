import os
from contextlib import closing
from io import BytesIO
from typing import TYPE_CHECKING

from flask import current_app
from PilLite import Image
from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import joinedload, relationship

from friday.utils import utcnow

from .base import Model
from .tag import TagMixin

if TYPE_CHECKING:
    from .tag import Tag


class RecipeTag(Model):
    # pylint: disable=too-few-public-methods
    tag_id = Column(Integer, ForeignKey("tag.id"), primary_key=True)
    recipe_id = Column(Integer, ForeignKey("recipe.id"), primary_key=True)


class Recipe(Model, TagMixin):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    names = Column(Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow, onupdate=utcnow)
    tags = relationship("Tag", secondary=RecipeTag.__table__)
    images = relationship("RecipeImage", back_populates="recipe")

    @classmethod
    def query_list(cls):
        query = cls.query
        query = query.options(joinedload(Recipe.tags), joinedload(Recipe.images))
        return query

    @property
    def namesList(self):
        return list(map(str.strip, self.names.split(",")))

    @namesList.setter
    def namesList(self, value):
        if isinstance(value, (list, set, tuple)):
            self.names = ",".join(value)
        elif isinstance(value, str):
            self.names = value


def get_storage():
    return current_app.extensions["storage"]


class RecipeImage(Model):
    filename = Column(Text, primary_key=True)
    _height = Column("height", Integer, nullable=False)
    _width = Column("width", Integer, nullable=False)
    recipe_id = Column(Integer, ForeignKey("recipe.id"), nullable=False)
    recipe = relationship("Recipe", back_populates="images")

    @classmethod
    def create(cls, commit=True, url=None, recipe=None, **kwargs):
        storage = get_storage()
        filename = storage.upload(recipe.name, url)

        with closing(storage.get(filename)) as f:
            img = Image.open(f)
            w, h = img.size

        return super().create(
            commit, filename=filename, recipe=recipe, _width=w, _height=h, **kwargs
        )

    @property
    def width(self):
        size = current_app.config.get("RECIPE_THUMBNAIL_SIZE", 300)
        w, _ = self._thumbnail_size(size)
        return w

    @property
    def height(self):
        size = current_app.config.get("RECIPE_THUMBNAIL_SIZE", 300)
        _, h = self._thumbnail_size(size)
        return h

    @property
    def url(self):
        storage = get_storage()
        size = current_app.config.get("RECIPE_THUMBNAIL_SIZE", 300)
        thumbnail_path = os.path.join(f"thumbnails-{size}", self.filename)
        if not storage.exists(thumbnail_path):
            wh = self._thumbnail_size(size)
            self._make_thumbnail(thumbnail_path, wh)
        return storage.get_url(thumbnail_path, external=True)

    @property
    def original_url(self):
        storage = get_storage()
        return storage.get_url(self.filename)

    def _make_thumbnail(self, filename, size):
        storage = get_storage()
        with closing(storage.get(self.filename)) as f:
            img = Image.open(f)
            if size != img.size:
                img = img.resize(size)

        buf = BytesIO()
        buf.name = filename
        img.save(buf)
        buf.seek(0)
        storage.put(filename, buf, overwrite=True)

    def _thumbnail_size(self, size):
        w, h = self._width, self._height
        if w >= h >= size:
            k = size / h
            return int(max(w * k, 1)), int(max(h * k, 1))
        if h > w > size:
            k = size / w
            return int(max(w * k, 1)), int(max(h * k, 1))
        return w, h
