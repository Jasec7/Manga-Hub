import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'

const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    creator: yup.string().required("A name is required"),
    release_year: yup
      .number()
      .positive()
      .required("Field missing")
      .typeError("Invalid")
      .min(1),
  });

  const MangaForm = ({onAddMangas}) =>{
    const formik = useFormik({
        initialValues:{
            title:"",
            creator:"",
            release_year:"",
        },
        validationSchema:formSchema,
        onSubmit:(values) =>{
            fetch('/mangas',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title:values.title,
                    creator:values.creator,
                    release_year:Number(values.release_year),
                })
            })
            .then((r) =>r.json())
            .then((newManga) =>{onAddMangas(newManga);
                formik.resetForm()
            })
        }
    })
            
    return(
        <div className='new-manga-form'>
        <h3>New Manga</h3>
        <form onSubmit={formik.handleSubmit}>
            <input 
            type='text' 
            name='title' 
            placeholder='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title}
             <input 
            type='text' 
            name='creator' 
            placeholder='creator'
            value={formik.values.creator}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.creator && formik.errors.creator}
            <input 
            type='text' 
            name='release_year' 
            placeholder='release year'
            value={formik.values.release_year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.release_year && formik.errors.release_year}
            <button type='submit'>Add Manga</button>
        </form>
        </div>
    )

}
export default MangaForm