import React, { useState, useEffect } from "react";

function Chapter({ chapter, volumes, onDelete, onUpdate }) {
  const [updateFields, setUpdateFields] = useState({
    title: chapter?.title || "",
    pages: chapter?.pages || "",
  });

  useEffect(() => {
    if (chapter) {
      setUpdateFields({
        title: chapter.title,
        pages: chapter.pages,
      });
    }
  }, [chapter]);

  if (!chapter || !chapter.volume) return null;

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
        Chapter {chapter.title}
      </h3>
      <p>Pages: {chapter.pages}</p>

    <button onClick={() => onDelete(chapter.id)}>Delete</button>
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
    <button
      onClick={() =>
        onUpdate(chapter.id, {
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