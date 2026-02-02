from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db




class Manga(db.Model, SerializerMixin):
    __tablename__="mangas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    creator = db.Column(db.String)
    release_year = db.Column(db.Integer)
    image_url = db.Column(db.String)

    volumes = db.relationship("Volume",back_populates="manga", cascade="all, delete-orphan")
    chapters = association_proxy('volumes','chapter', creator=lambda chapter_obj: Volume(chapter=chapter_obj))
    reviews = db.relationship("Review", back_populates="manga",cascade="all, delete-orphan")

    
    serialize_rules = ('-volumes.manga', '-reviews.manga' ,)

    def __repr__(self):
        return f'<Manga {self.id}, {self.title}, {self.creator}, {self.release_year}> '

class Chapter(db.Model, SerializerMixin):
    __tablename__="chapters"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    pages = db.Column(db.Integer)

    volumes = db.relationship("Volume", back_populates="chapter", cascade="all, delete-orphan")
    mangas = association_proxy('volumes', 'manga', creator=lambda manga_obj: Volume(manga=manga_obj))

    serialize_rules = ('-mangas.chapters', '-volumes.chapter' ,)

    def __repr__(self):
        return f'<Chapter {self.id}, {self.title}, {self.pages}> '
    
class Volume(db.Model, SerializerMixin):
    __tablename__="volumes"

    id = db.Column(db.Integer, primary_key=True)
    volume_number = db.Column(db.Integer)
    edition = db.Column(db.String)

    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapters.id'))

    manga = db.relationship("Manga", back_populates="volumes")
    chapter = db.relationship("Chapter", back_populates="volumes")

    serialize_rules = ('-manga.volumes', '-chapter.volumes' ,)

    def __repr__(self):
        return f'<Volume {self.id}, vol={self.volume_number}, edition={self.edition}, {self.manga.title} {self.chapter.title}> '



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




  