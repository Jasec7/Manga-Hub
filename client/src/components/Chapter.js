
function Chapter({title, pages, chapter_number}){
    return(
        <div>
            <h4>{title}</h4>
            <p>Pages:{pages}</p>
            <p>{chapter_number}</p>
        </div>
    )
}

export default Chapter;