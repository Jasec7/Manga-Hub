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

    volumes = db.relationship("Volume", secondary='chapters',back_populates="mangas")
    chapters = db.relationship('Chapter', back_populates="manga", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="manga",cascade="all, delete-orphan")

    serialize_rules = ('-chapters.manga', '-reviews.manga' ,)

    def __repr__(self):
        return f'<Manga {self.id}, {self.title}, {self.creator}, {self.release_year}> '

class Chapter(db.Model, SerializerMixin):
    __tablename__="chapters"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    pages = db.Column(db.Integer)
    
    manga_id = db.Column(db.Integer, db.ForeignKey('mangas.id'))
    volume_id = db.Column(db.Integer, db.ForeignKey('volumes.id'))

    manga = db.relationship('Manga', back_populates="chapters")
    volume = db.relationship("Volume", back_populates="chapters")
    

    serialize_rules = ('-manga.chapters', '-volume.chapters' ,)

    def __repr__(self):
        return f'<Chapter {self.id}, {self.title}, {self.pages}, {self.manga.title}, {self.volume.volume_number}> '
    
class Volume(db.Model, SerializerMixin):
    __tablename__="volumes"

    id = db.Column(db.Integer, primary_key=True)
    volume_number = db.Column(db.Integer)
    edition = db.Column(db.String)

    mangas = db.relationship("Manga", secondary='chapters', back_populates="volumes")
    chapters = db.relationship("Chapter", back_populates="volume", cascade="all, delete-orphan")

    serialize_rules = ('-mangas.volumes', '-chapters.volume' ,)

    def __repr__(self):
        return f'<Volume {self.id}, vol={self.volume_number}, edition={self.edition} '



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




  