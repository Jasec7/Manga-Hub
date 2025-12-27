#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import  Manga, MangaChapter, Chapter, Review


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Mangas(Resource):
    def get(self):
        mangas = [manga.to_dict() for manga in Manga.query.all()]

        return make_response(mangas, 200)

    def post(self):
        data = request.get_json()
        
        if 'title' not in data or not data['title'] or data['title'].strip() == "":
            return {'error':'A title is required'}, 400
        if 'creator' not in data or not data['creator'] or data['creator'].strip() == "":
            return {'error':'A creator is required'}, 400
        if 'release_year' not in data:
            return {'error':'A release year is required'}, 400
        if not isinstance(data['release_year'], int):
            return {'error':'Release year must be an integer'}, 400

        
        new_manga = Manga(
            title = data['title'],
            creator = data['creator'],
            release_year = data['release_year']
        )
        db.session.add(new_manga)
        db.session.commit()
        
        return make_response(new_manga.to_dict(), 201 )


class MangaId(Resource):
    def get(self, id):
        manga = Manga.query.filter_by(id = id).first()

        if not manga:
            return {'error':'Manga not found'}, 404

        return make_response(manga.to_dict(), 200)

class Reviews(Resource):
    def get(self):
       reviews = [review.to_dict() for review in Review.query.all()]
       return make_response(reviews, 200)

    def post(self):
        data = request.get_json()

        if 'reviewer' not in data or not data['reviewer'] or data['reviewer'].strip() == "":
            return {'error':'Reviewer is required'}, 400
        if 'comment' not in data or not data['comment'] or data['comment'].strip() == "":
            return {'error':'A comment is required'}, 400
        if 'rating' not in data:
            return {'error':'Rating is required'}
        if not isinstance(data['rating'],(int, float)):
            return {'error':'It needs a rating'}, 400
        if data['rating'] <= 0 or data['rating'] > 5:
            return {'error':'Rating must be between 1 and 5'}, 400

        manga = Manga.query.filter_by(id = data['manga_id']).first()

        if not manga:
            return {'error':'Manga not found'}, 404

        new_review = Review(
            reviewer = data['reviewer'],
            comment = data['comment'],
            rating = data['rating'],
            manga_id = data['manga_id']
        )
        db.session.add(new_review)
        db.session.commit()

        return make_response(new_review.to_dict(), 201)

class ReviewsId(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return {'error':'Review not found'}, 404
        
        return make_response(review.to_dict(), 200)

    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        data = request.get_json()
        
        if not review:
            return {'error':'Review not found'}, 404
        
        if 'rating' in data:
            if not isinstance(data['rating'],(int, float)):
                return {'error':'It needs a rating'}, 400
            if data['rating'] <= 0 or data['rating'] > 5:
                return {'error':'Rating must be between 1 and 5'}, 400

        fields = ['reviewer', 'comment', 'rating']

        for key in data:
            if key in fields:
                setattr(review, key, data[key])

        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(), 202)

    def delete(self,id):
        review = Review.query.filter_by(id=id).first()

        if not review:
            return {'error':'Review not found'}, 404

        db.session.delete(review)
        db.session.commit()

        return make_response("", 204)

class Chapters(Resource):
    def get(self):
        chapters = [chapter.to_dict() for chapter in Chapter.query.all()]
        return make_response(chapters, 200)
    
    def post(self):
        data = request.get_json()

        if 'title' not in data or data['title'].strip() == "":
            return {'error':'A title is required'}, 400
        if 'pages' not in data:
            return {'error':'Pages are required'}, 400
        if not isinstance(data['pages'], int):
            return {'error':'Pages must be a number'}
        
        new_chapter = Chapter(
            title = data['title'],
            pages = data['pages']
        )
        db.session.add(new_chapter)
        db.session.commit()
    
class ChaptersId(Resource):
    def get(self, id):
        chapter = Chapter.query.filter_by(id=id).first()
        if not chapter:
            return {'error':'Chapter not found'}, 404
        
        return make_response(chapter.to_dict(), 200)
    
class MangaChapters(Resource):
    def get(self):
        m_chapters = [m_chapter.to_dict() for m_chapter in MangaChapter.query.all()]
        return make_response(m_chapters, 200)
    
    def post(self):
        data = request.get_json()

        if "chapter_number" not in data:
            return {'error':'Field missing'}, 400
        if not isinstance(data['chapter_number'], int):
            return {'error':'Chapter number must be an integer'}, 400
        if 'manga_id' not in data:
            return {'error':'manga_id is required'}, 400
        if 'chapter_id' not in data:
            return {'error':'chapter_id is required'}, 400
        
        manga = Manga.query.filter_by(id=data['manga_id']).first()
        if not manga:
            return {'error':'Manga not found'}, 404
        
        chapter = Chapter.query.filter_by(id=data['chapter_id']).first()
        if not chapter:
            return {'error':'Chapter not found'}, 404

        duplicate = MangaChapter.query.filter_by(manga_id = data['manga_id'], chapter_id = ['chapter_id']).first()
        if duplicate:
            return {'error':'This chapter is already linked in the chapters'}, 409
        
        new_manga_chapter = MangaChapter(
            chapter_number = data['chapter_number'],
            manga_id = data['manga_id'],
            chapter_id = data['chapter_id']
        )
        db.session.add(new_manga_chapter)
        db.session.commit()

        return make_response(new_manga_chapter.to_dict(), 201)
        
class MangaChaptersId(Resource):
    def get(self, id):
        m_chapter = MangaChapter.query.filter_by(id=id).first()

        if not m_chapter:
            return {'error':'Not Found'}, 404
        
        return make_response(m_chapter.to_dict(), 200)
    
api.add_resource(Mangas,'/mangas')
api.add_resource(MangaId,'/mangas/<int:id>')
api.add_resource(Reviews,'/reviews')
api.add_resource(ReviewsId,'/reviews/<int:id>')
api.add_resource(Chapters,'/chapters')
api.add_resource(ChaptersId,'/chapters/<int:id>')
api.add_resource(MangaChapters,'/mangachapters')
api.add_resource(MangaChaptersId,'/mangachapters/<int:id')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

