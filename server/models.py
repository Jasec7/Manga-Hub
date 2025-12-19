from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!


class Manga(db.Model, SerializerMixin):
    __tablename__="mangas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    creator = db.Column(db.String)
    release_year = db.Column(db.Integer)

class Chapter(db.Model, SerializerMixin):
    __tablename__="chapters"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    pages = db.Column(db.Integer)

class MangaChapter(db.Model, SerializerMixin):
    __tablename__="manga_chapters"

    id = db.Column(db.Integer, primary_key=True)
    chapter_number = db.Column(db.Integer)

    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapters.id'))

class Review(db.Model, SerializerMixin):
    __tablename__="reviews"

    id = db.Column(db.Integer, primary_key=True)
    reviewer = db.Column(db.String)
    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))