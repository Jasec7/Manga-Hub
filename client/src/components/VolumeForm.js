import {useFormik} from "formik";
import * as yup from "yup";

const formSchema = yup.object().shape({
    volume_number: yup
      .number()
      .positive()
      .required("Field missing")
      .typeError("Invalid")
      .min(1),
    edition: yup.string().required("Must enter a title"),
  });

const VolumeForm = ({onAddVolumes}) =>{
    const formik = useFormik({
        initialValues:{
            volume_number:"",
            edition:"",
        },
        validationSchema:formSchema,
        onSubmit:(values) =>{
            fetch("/volumes",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    volume_number:Number(values.volume_number),
                    edition:values.edition
                })
            })
            .then((r) =>r.json())
            .then((newVolume) =>{onAddVolumes(newVolume);
                formik.resetForm()
            })
        }
    });

    return(
        <div className='new-volume-form'>
        <h3>New Volume</h3>
        <form onSubmit={formik.handleSubmit}>
            <input 
            type='text' 
            name='volume_number' 
            placeholder='volume number'
            value={formik.values.volume_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.volume_number && formik.errors.volume_number}
            <input 
            type='text' 
            name='edition' 
            placeholder='edition'
            value={formik.values.edition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.edition && formik.errors.edition}
    
            <button type='submit'>Add Volume</button>
        </form>
        </div>
    )
}
export default VolumeForm;