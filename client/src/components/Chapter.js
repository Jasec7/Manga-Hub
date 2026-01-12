
function Chapter({ manga_chapter, onDelete }) {
  console.log([manga_chapter])
  return (
    <div>
      <h3>
        Chapter {manga_chapter.chapter_number}: {manga_chapter.chapter.title}
      </h3>
      <p>Pages:{manga_chapter.chapter.pages}</p>
      <button onClick={() => onDelete(manga_chapter.id)}>Delete</button>
    </div>
  );
}

export default Chapter;