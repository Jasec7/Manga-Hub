import React, { useState, useEffect } from "react";

function Chapter({ volume, onDelete, onUpdate }) {
  const [updateFields, setUpdateFields] = useState({
    title: volume?.chapter?.title || "",
    pages: volume?.chapter?.pages || "",
  });

  useEffect(() => {
    if (volume?.chapter) {
      setUpdateFields({
        title: volume.chapter.title,
        pages: volume.chapter.pages,
      });
    }
  }, [volume]);

  if (!volume || !volume.chapter) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <h3>
        Chapter {volume.volume_number}: {volume.chapter.title}
      </h3>
      <p>Pages: {volume.chapter.pages}</p>

      <input
        type="text"
        name="title"
        value={updateFields.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="pages"
        value={updateFields.pages}
        onChange={handleChange}
      />

      <button onClick={() => onDelete(volume.chapter.id)}>Delete</button>

      <button
        onClick={() =>
          onUpdate(volume.chapter.id, {
            title: updateFields.title,
            pages: Number(updateFields.pages),
          })
        }
      >
        Save
      </button>
    </div>
  );
}

export default Chapter;