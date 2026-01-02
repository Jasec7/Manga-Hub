import React, {useState} from "react";

function ReviewForm({onAddReview, manga_id}){
    const [formData, setFormData] = useState({
        reviewer:"",
        comment:"",
        rating:""
    })
    function handleSubmit(e){
        e.preventDefault();
        const rate = parseInt(formData.rating)

        fetch("/reviews", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({reviewer:formData.reviewer, comment:formData.comment, rating:parseInt(rate), manga_id:manga_id})
        })
        .then((r)=> r.json())
        .then((newReview) => {onAddReview(newReview);
            setFormData({reviewer:"", comment:"", rating:""})
        });
    };
    return(
        <div className="new-review-form">
        <h4>New review</h4>
        <form onSubmit={handleSubmit}>
            <input type='text' name='reviewer' placeholder='reviewer'
            value={formData.reviewer}
            onChange={(e) => setFormData({...formData, reviewer: e.target.value})}/>
            <input type='text' name='comment' placeholder='comment'
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}/>
            <input type='text' name='rating' placeholder='rating'
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: e.target.value})}/>
            <button type='submit'>Add Review</button>
        </form>
        </div>
    )
    
}

export default ReviewForm