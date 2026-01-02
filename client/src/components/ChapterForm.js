import React, {useState} from 'react';

function ChapterForm({onAddChapter, manga_id}){
    const [formData, setFormData] = useState({
        title:"",
        pages:"",
        chapter_number:""
    });

    function handleSubmit(e){
        e.preventDefault();
        const page = parseInt(formData.pages)
        const chapter_n = parseInt(formData.chapter_number)

        fetch("/chapters", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title:formData.title, pages:parseInt(page), chapter_number:parseInt(chapter_n), manga_id:manga_id})
        })
        .then((r) => r.json())
        .then((newChapter) => {onAddChapter(newChapter);
            setFormData({title:"", pages:"", chapter_number:""})
        });
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