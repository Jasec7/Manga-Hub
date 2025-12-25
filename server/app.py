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

        return make_response(jsonify(mangas), 200)

class MangaId(Resource):
    def get(self, id):
        manga = Manga.query.filter_by(id = id).first()

        return make_response(jsonify(manga.to_dict()), 200)
    
api.add_resource(Mangas,'/mangas')
api.add_resource(MangaId,'/mangas/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

