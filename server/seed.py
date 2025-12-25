#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Manga, Chapter, MangaChapter, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!


        print("Deleting data...")
        MangaChapter.query.delete()
        Review.query.delete()
        Manga.query.delete()
        Chapter.query.delete()
        Review.query.delete()

        print("creating mangas...")
        m1 = Manga(title = 'Jujutsu Kaisen', creator = "Gege Akutami", release_year = 2018)
        m2 = Manga(title = 'Hunter x Hunter', creator = 'Yoshihiro Toashi', release_year = 1998)
        m3 = Manga(title = 'Dragon Ball Z', creator = "akira Toriyama", release_year = 1988)
        m4 = Manga(title = "One Punch Man", creator = "One", release_year = 2009)
        mangas = [m1, m2, m3, m4]

        print("creating chapters...")
        c1 = Chapter(title = 'Ryomen Sukuna', pages = 55)
        c2 = Chapter(title = 'The Day of Departure', pages = 184)
        c3 = Chapter(title = 'The Mysterious Warrior from Space', pages = 15)
        c4 = Chapter(title = 'One Punch', pages = 18)
        chapters = [c1, c2, c3, c4]

        print("Creating mangaChapters...")
        mc1 = MangaChapter(chapter_number = 1, manga = m1, chapter = c1)
        mc2 = MangaChapter(chapter_number = 1, manga = m2, chapter = c2)
        mc3 = MangaChapter(chapter_number = 1, manga = m3, chapter = c3)
        mc4 = MangaChapter(chapter_number = 1, manga = m4, chapter = c4)
        manga_chapters = [mc1, mc2, mc3, mc4]

        print("Creating reviews")
        rw1 = Review(reviewer = 'Sean_2275', comment = "Amazing fight scenes, super entertaining", rating = 5, manga = m1)
        rw2 = Review(reviewer = 'Antoine', comment = "Great anime, but it needs more chapters", rating = 4, manga = m1)
        rw3 = Review(reviewer = 'Freccks', comment = "One of the greates mangas", rating = 5, manga = m2)
        rw4 = Review(reviewer = 'Kat22', comment = "Overrated", rating = 3, manga = m2)
        rw5 = Review(reviewer = 'Pat', comment = "I can't have enough of it, I love it", rating = 5, manga = m3)
        rw6 = Review(reviewer = 'Anita-kun', comment = "Good manga but bad power scale development", rating = 4, manga = m3)
        rw7 = Review(reviewer = 'Saitama_90', comment = "Hilarious love the story", rating = 5, manga = m4)
        rw8 = Review(reviewer = 'Xenos', comment = "I can't wait for the next chapters! I'm obsses", rating = 5, manga = m4)
        reviews = [rw1, rw2, rw3, rw4, rw5, rw6, rw7, rw8]

        db.session.add_all(mangas)
        db.session.add_all(chapters)
        db.session.add_all(manga_chapters)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding done!")