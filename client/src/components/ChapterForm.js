import {useFormik} from "formik";
import * as yup from "yup";
import API_URL from "../api";

const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    pages: yup.number().positive().integer().required("The number of pages is required"),
    volume_id: yup.number().required("Pick a volume")
  });

function ChapterForm({volumes,manga_id,onAddChapter }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      pages: "",
      volume_id:""
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
          manga_id: manga_id,
          volume_id: Number(values.volume_id),
        }),
      })
        .then((r) => r.json())
        .then((newChapter) => {
        onAddChapter(newChapter);
        formik.resetForm();
        })
    }
  })  

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
        <select
        name="volume_id"
        value={formik.values.volume_id}
        onChange={formik.handleChange}
        >
          <option value="">Select volume</option>
          {volumes.map(v => (
            <option key={v.id} value={v.id}>
              Volume {v.volume_number} ({v.edition})
            </option>
          ))}
          </select>
        <button type="submit">Add Chapter</button>
      </form>
    </div>
  );
}

export default ChapterForm;