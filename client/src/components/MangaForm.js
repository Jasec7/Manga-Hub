import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'


function MangaForm({onAddMangas}){
    const [formData, setFormData] = useState({
        title:"",
        creator:"",
        release_year:0,
    });

    function handleSubmit(e){
        e.preventDefault();
        const year = parseInt(formData.release_year);

        fetch("/mangas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title:formData.title, creator:formData.creator, release_year:parseInt(year)
            })
        })
        .then((r) => r.json())
        .then((newManga) => {onAddMangas(newManga);
           setFormData({title:"", creator:"", release_year:0})
        })
    }
    return(
        <div className='new-manga-form'>
        <h3>New Manga</h3>
        <form onSubmit={handleSubmit}>
            <input type='text' name='title' placeholder='title'
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}/>
             <input type='text' name='creator' placeholder='creator'
            value={formData.creator}
            onChange={(e) => setFormData({...formData, creator: e.target.value})}/>
             <input type='text' name='release_year' placeholder='release_year'
            value={formData.release_year}
            onChange={(e) => setFormData({...formData, release_year:e.target.value})}/>
            <button type='submit'>Add Manga</button>
        </form>
        </div>
    )

}
export default MangaForm