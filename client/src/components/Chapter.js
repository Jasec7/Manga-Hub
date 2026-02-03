
function Chapter({ volume, onDelete }) {
  
  return (
    <div>
      <h3>
        Chapter {volume.volume_number}: {volume.chapter.title}
      </h3>
      <p>Pages:{volume.chapter.pages}</p>
      <button onClick={() => onDelete(volume.id)}>Delete</button>
    </div>
  );
}

export default Chapter;