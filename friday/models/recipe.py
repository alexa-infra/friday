from flask import current_app
from sqlalchemy import Table, Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from PilLite import Image
from friday.utils import utcnow
from .. import storage
from . import db
from .tag import Tag


RecipeTag = Table('recipe_tag', db.metadata,
                  Column('tag_id', Integer, ForeignKey('tag.id'), primary_key=True),
                  Column('recipe_id', Integer, ForeignKey('recipe.id'), primary_key=True))


class Recipe(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    names = Column(Text, nullable=False)
    created = Column(DateTime, nullable=False, default=utcnow)
    updated = Column(DateTime, nullable=False, default=utcnow,
                     onupdate=utcnow)
    tags = relationship('Tag', secondary=RecipeTag)
    images = relationship('RecipeImage', back_populates='recipe')

    @classmethod
    def query_list(cls):
        return (
            cls.query.options(db.joinedload(Recipe.tags),
                              db.joinedload(Recipe.images))
        )

    @property
    def tagsList(self):
        return [tag.name for tag in self.tags]

    @tagsList.setter
    def tagsList(self, value):
        if isinstance(value, (list, set, tuple)):
            Tag.setTags(self, value)

    @property
    def namesList(self):
        return list(map(str.strip, self.names.split(',')))

    @namesList.setter
    def namesList(self, value):
        if isinstance(value, (list, set, tuple)):
            self.names = ','.join(value)
        elif isinstance(value, str):
            self.names = value


class RecipeImage(db.Model):
    filename = Column(Text, primary_key=True)
    height = Column(Integer, nullable=False)
    width = Column(Integer, nullable=False)
    recipe_id = Column(Integer, ForeignKey('recipe.id'), nullable=False)
    recipe = relationship('Recipe', back_populates='images')

    @classmethod
    def create(cls, commit=True, url=None, recipe=None, **kwargs):
        filename = storage.upload(recipe.name, url)
        path = storage.get_path(filename)

        if current_app:
            max_size = current_app.config['MAX_IMAGE_SIZE']
        else:
            max_size = 1024

        img = Image.open(path)
        w, h = img.size
        if w > max_size or h > max_size:
            img.thumbnail((max_size, max_size))
            img.save(path)
            w, h = img.size

        return super().create(
            commit,
            filename,
            recipe,
            width=w,
            height=h,
            **kwargs
        )

    @property
    def url(self):
        return storage.get_url(self.filename)
