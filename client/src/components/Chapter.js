
function Chapter({ mangachapter }) {
  return (
    <div>
      <h3>
        Chapter {mangachapter.chapter_number}: {mangachapter.chapter.title}
      </h3>
      <p>Pages: {mangachapter.chapter.pages}</p>
    </div>
  );
}

export default Chapter;