import React, {useState} from 'react';

function ChapterForm({onUpdate, manga_id}){
    function handleSubmit(e) {
    e.preventDefault();

    fetch("/manga_chapters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        manga_id,
        chapter_id,
        chapter_number
      })
    }).then(() => onUpdate());
        
    };

    return(
        <div className="new-chapter-form">
            <h4>New Chapter</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' name='title' placeholder='title'
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <input type='text' name='pages' placeholder='pages'
            value={formData.pages}
            onChange={(e) => setFormData({...formData, pages: e.target.value})}/>
            <input type='text' name='chapter_number' placeholder='chapter_number'
            value={formData.chapter_number}
            onChange={(e) => setFormData({...formData, chapter_number: e.target.value})}/>
            <button type='submit'>Add Chapter</button>
        </form>
        </div>
    )
}

export default ChapterForm;