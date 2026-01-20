import React, {useState} from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import API_URL from "../api";

 const formSchema = yup.object().shape({
    reviewer: yup.string().required("Must enter a reviewer name"),
    comment: yup.string().required("A comment is required"),
    rating: yup
      .number()
      .positive()
      .required("It needs a rating")
      .typeError("Invalid rating ")
      .min(1)
      .max(5),
  });

const ReviewForm = ({manga_id, onUpdate}) =>{
  const formik = useFormik({
    initialValues:{
      reviewer:"",
      comment:"",
      rating:"",
    },
    validationSchema:formSchema,
    onSubmit:(values) =>{
      fetch(`${API_URL}/reviews`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({...values,manga_id:manga_id})
      }).then((res) =>{
       if(res.status === 201){
         formik.resetForm();
        onUpdate();
       }
      })
    }
  })


  return (
    <div className="new-review-form">
      <h4>New Review</h4>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="reviewer"
          placeholder="Reviewer"
          value={formik.values.reviewer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.reviewer && formik.errors.reviewer}
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.comment && formik.errors.comment}
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.rating && formik.errors.rating}
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}


export default ReviewForm