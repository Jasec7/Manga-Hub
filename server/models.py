from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db

# Models go here!
class MangaChapter(db.Model, SerializerMixin):
    __tablename__="manga_chapters"

    id = db.Column(db.Integer, primary_key=True)
    chapter_number = db.Column(db.Integer)

    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapters.id'))

    manga = db.relationship("Manga", back_populates="manga_chapters")
    chapter = db.relationship("Chapter", back_populates="manga_chapters")

    def __repr__(self):
        return f'<MangaChapter {self.id}, {self.chapter_number}> '


class Manga(db.Model, SerializerMixin):
    __tablename__="mangas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    creator = db.Column(db.String)
    release_year = db.Column(db.Integer)

    manga_chapters = db.relationship("MangaChapter", back_populates="manga", cascade="all, delete-orphan")
    chapters = db.relationship("Chapter", secondary=MangaChapter.__table__, back_populates="mangas")
    reviews = db.relationship("Review", back_populates="manga",cascade="all, delete-orphan")


    def __repr__(self):
        return f'<Manga {self.id}, {self.title}, {self.creator}, {self.release_year}> '

class Chapter(db.Model, SerializerMixin):
    __tablename__="chapters"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    pages = db.Column(db.Integer)

    manga_chapters = db.relationship("MangaChapter", back_populates="chapter")
    mangas = db.relationship("Manga", secondary=MangaChapter.__table__, back_populates="chapters")

    def __repr__(self):
        return f'<Chapter {self.id}, {self.title}, {self.pages}> '


class Review(db.Model, SerializerMixin):
    __tablename__="reviews"

    id = db.Column(db.Integer, primary_key=True)
    reviewer = db.Column(db.String)
    comment = db.Column(db.String)
    rating = db.Column(db.Integer)
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))

    manga = db.relationship("Manga", back_populates="reviews")

    def __repr__(self):
        return f'<Review {self.id}, {self.reviewer}, {self.comment}, {self.rating}> '




  