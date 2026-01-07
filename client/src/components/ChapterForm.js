import React, {useState} from 'react';

function ChapterForm({ manga_id, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    pages: "",
    chapter_number: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    
    fetch("/chapters",{ 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        pages: Number(formData.pages)
      })
    })
      .then((r) => r.json())
      .then((newChapter) => {
        return fetch("/mangachapters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            manga_id: manga_id,
            chapter_id: newChapter.id,
            chapter_number: Number(formData.chapter_number)
          })
        });
      })
      .then(() => {
        setFormData({ title: "", pages: "", chapter_number: "" });
        onUpdate(); 
      });
  }

  return (
    <div>
      <h4>New Chapter</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Pages"
          value={formData.pages}
          onChange={(e) =>
            setFormData({ ...formData, pages: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Chapter Number"
          value={formData.chapter_number}
          onChange={(e) =>
            setFormData({ ...formData, chapter_number: e.target.value })
          }
        />
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
}

export default ChapterForm;