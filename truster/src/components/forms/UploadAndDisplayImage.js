import dummy from "../../res/dummy_profile_pic.png"
import "../../styles/uploadanddisplayimage.css"
import { useContext, useMemo } from "react"
import {ImCross, ImUpload2} from "react-icons/im"
import { ErrorToastContext } from "../../App";

const UploadAndDisplayImage = ({
    selectedImage, setSelectedImage
}) => {
  
    const image = useMemo(() => selectedImage ? URL.createObjectURL(selectedImage) : null, [selectedImage])
    const displayError = useContext(ErrorToastContext)

    return (
      <div className="upload-display-image">
        
        <div className="image-container">
            {image && 
            <div className="profile-pic">
                <ImCross 
                    size={14}
                    className="cross"
                    onClick={()=>setSelectedImage(null)} 
                />
                <img 
                    alt="not found" 
                    width={"100%"} 
                    height={"100%"}
                    src={image} 
                />
            </div>}
            {!image && 
            <img 
                alt="not found" 
                width={"100%"} 
                height={"100%"} 
                src={dummy} 
            />}
        </div>
        <input
            id="file"
            type="file"
            name="myImage"
            value={''}
            onChange={(event) => {
                let file = event.target.files[0]
                if(file.size > 7000000){
                    console.log("File size too big")
                    displayError("error","The file size is too big. The maximum size is 7MB")
                }else {
                    setSelectedImage(file);
                }
            }}
            accept=".jpg, .jpeg, .png"
        />
        <label className="label" for="file"><ImUpload2 size={14} /><h6>Choose a file</h6></label>
        
      </div>
    );
  };
  
export default UploadAndDisplayImage;