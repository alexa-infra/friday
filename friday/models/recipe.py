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

    @property
    def namesList(self):
        return list(map(str.strip, self.names.split(',')))

    @classmethod
    def new(cls, **kwargs):
        tags = kwargs.pop('tagsList', None)
        names = kwargs.pop('namesList', None)
        obj = cls(**kwargs)
        if isinstance(tags, (list, set)):
            Tag.setTags(obj, tags)
        if isinstance(names, (list, set)):
            obj.names = ','.join(names)
        elif isinstance(names, str):
            obj.names = names
        return obj

    def update(self, **kwargs):
        tags = kwargs.pop('tagsList', None)
        names = kwargs.pop('namesList', None)
        if isinstance(tags, (list, set)):
            Tag.setTags(self, tags)
        if isinstance(names, (list, set)):
            self.names = ','.join(names)
        elif isinstance(names, str):
            self.names = names
        for k, v in kwargs.items():
            setattr(self, k, v)


class RecipeImage(db.Model):
    filename = Column(Text, primary_key=True)
    height = Column(Integer, nullable=False)
    width = Column(Integer, nullable=False)
    recipe_id = Column(Integer, ForeignKey('recipe.id'), nullable=False)
    recipe = relationship('Recipe', back_populates='images')

    @classmethod
    def new(cls, url=None, recipe=None, **kwargs):
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

        return cls(
            filename=filename,
            width=w,
            height=h,
            recipe=recipe,
            **kwargs
        )

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

    @property
    def url(self):
        return storage.get_url(self.filename)
