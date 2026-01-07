
function Chapter({ manga_chapter }) {
  console.log(manga_chapter[1])
  return (
    <div>
      <h3>
        Chapter {manga_chapter.chapter_number}: {manga_chapter.chapter.title}
      </h3>
      <p>Pages:{manga_chapter.chapter.pages}</p>
    </div>
  );
}

export default Chapter;