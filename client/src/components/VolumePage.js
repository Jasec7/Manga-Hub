import VolumeList from "./VolumeList";
import VolumeForm from "./VolumeForm";


function VolumePage({volumes, onAddVolumes}){
    return(
        <div>
            <h2>Volumes</h2>
            <VolumeList volumes={volumes}/>
            <VolumeForm onAddVolumes={onAddVolumes}/>
        </div>
    )
};

export default VolumePage;