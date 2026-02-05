import {useFormik} from "formik";
import * as yup from "yup";
import API_URL from "../api";

const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    pages: yup.number().positive().integer().required("The number of pages is required"),
    volume_number:
      yup.number()
      .required("it needs the chapter's number")
      .typeError("Please enter an Integer")
      .min(1),
    edition: yup.string()
  });

function ChapterForm({ manga_id, onAddChapter }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      pages: "",
      volume_number: "",
      edition:""
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
          return fetch("/volumes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              manga_id: manga_id,
              chapter_id: newChapter.id,
              volume_number: Number(values.volume_number),
              edition:values.edition
            }),
          });
        })
        .then((r) =>r.json())
        .then((newVolume) =>{onAddChapter(newVolume);
              formik.resetForm()
          });
      }
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
          name="volume_number"
          placeholder="Volume Number"
          value={formik.values.volume_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.volume_number && formik.errors.volume_number}
        <input
          type="text"
          name="edition"
          placeholder="Edition"
          value={formik.values.edition}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.edition && formik.errors.edition}
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
}

export default ChapterForm;