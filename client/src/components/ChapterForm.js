import {useFormik} from "formik";
import * as yup from "yup";
import API_URL from "../api";

const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    pages: yup.number().positive().integer().required("The number of pages is required"),
    chapter_number:
      yup.number()
      .required("it needs the chapter's number")
      .typeError("Please enter an Integer")
      .min(1),
  });

function ChapterForm({ manga_id, onUpdate }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      pages: "",
      chapter_number: "",
    },
    validateOnChange:false,
    validateOnBlur:false,
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/chapters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          pages: Number(values.pages),
        }),
      })
        .then((r) => r.json())
        .then((newChapter) => {
          return fetch("/mangachapters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              manga_id: manga_id,
              chapter_id: newChapter.id,
              chapter_number: Number(values.chapter_number),
            }),
          });
        })
        .then((res) => {
          if (res.ok) {
            formik.resetForm();
            onUpdate();
          }
        });
    },
  });
  

  return (
    <div>
      <h4>New Chapter</h4>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title}
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          value={formik.values.pages}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.pages && formik.errors.pages}
        <input
          type="number"
          name="chapter_number"
          placeholder="Chapter Number"
          value={formik.values.chapter_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.chapter_number && formik.errors.chapter_number}
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
}

export default ChapterForm;