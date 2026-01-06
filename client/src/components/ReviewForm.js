import React, {useState} from "react";

function ReviewForm({ onUpdate, manga_id }) {
  const [formData, setFormData] = useState({
    reviewer: "",
    comment: "",
    rating: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reviewer: formData.reviewer,
        comment: formData.comment,
        rating: Number(formData.rating),
        manga_id: manga_id
      })
    }).then(() => {
      setFormData({ reviewer: "", comment: "", rating: "" });
      onUpdate(); 
    });
  }

  return (
    <div className="new-review-form">
      <h4>New Review</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reviewer"
          value={formData.reviewer}
          onChange={(e) =>
            setFormData({ ...formData, reviewer: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Rating"
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: e.target.value })
          }
        />
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}


export default ReviewForm