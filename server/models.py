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

    serialize_rules = ('-manga.manga_chapters', '-chapter.manga_chapters' ,)

    def __repr__(self):
        return f'<MangaChapter {self.id}, {self.chapter_number}, {self.manga.title}> '


class Manga(db.Model, SerializerMixin):
    __tablename__="mangas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    creator = db.Column(db.String)
    release_year = db.Column(db.Integer)

    manga_chapters = db.relationship("MangaChapter", back_populates="manga", cascade="all, delete-orphan")
    chapters = association_proxy('manga_chapters','chapter', creator=lambda chapter_obj: MangaChapter(chapter=chapter_obj))
    reviews = db.relationship("Review", back_populates="manga",cascade="all, delete-orphan")
    
    serialize_rules = ('-chapters.mangas', '-manga_chapters.manga', '-reviews.manga' ,)

    def __repr__(self):
        return f'<Manga {self.id}, {self.title}, {self.creator}, {self.release_year}> '

class Chapter(db.Model, SerializerMixin):
    __tablename__="chapters"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    pages = db.Column(db.Integer)

    manga_chapters = db.relationship("MangaChapter", back_populates="chapter")
    mangas = association_proxy('manga_chapters', 'manga', creator=lambda manga_obj: MangaChapter(manga=manga_obj))

    serialize_rules = ('-mangas.chapters', '-manga_chapters.chapter' ,)

    def __repr__(self):
        return f'<Chapter {self.id}, {self.title}, {self.pages}> '


class Review(db.Model, SerializerMixin):
    __tablename__="reviews"

    id = db.Column(db.Integer, primary_key=True)
    reviewer = db.Column(db.String)
    comment = db.Column(db.String)
    rating = db.Column(db.Float)
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))

    manga = db.relationship("Manga", back_populates="reviews")

    serialize_rules = ('-manga.reviews' ,)

    def __repr__(self):
        return f'<Review {self.id}, {self.reviewer}, {self.comment}, {self.rating}> '




  