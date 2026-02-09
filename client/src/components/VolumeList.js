
function VolumeList({volumes}){
    return(
        <div className="card">
            {volumes.map((volume) =>(
                <div key={volume.id}>
                    <h3>{volume.volume_number} {volume.edition}</h3>
                </div>
            ))}
        </div>
    )
};

export default VolumeList