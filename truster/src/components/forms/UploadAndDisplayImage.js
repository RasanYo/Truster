import dummy from "../../res/dummy_profile_pic.png"
import "../../styles/uploadanddisplayimage.css"
import { useContext, useMemo } from "react"
import {ImCross, ImUpload2} from "react-icons/im"
// import { useEffect } from "react";
// import { UserContext } from "../../App";

const UploadAndDisplayImage = ({
    selectedImage, setSelectedImage
}) => {
  
    // const {user, isLoggedIn} = useContext(UserContext)
    const image = useMemo(() => selectedImage ? URL.createObjectURL(selectedImage) : null, [selectedImage])
    // useEffect(() => {
    //     console.log(selectedImage)
    //     // user.uploadProfilePicture(selectedImage, 12345)
    //     // user.getProfilePictureURL(12345).then(url => console.log(url))
    // },[selectedImage])

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
                setSelectedImage(event.target.files[0]);
            }}
            accept=".jpg, .jpeg, .png"
        />
        <label className="label" for="file"><ImUpload2 size={14} /><h6>Choose a file</h6></label>
        
      </div>
    );
  };
  
export default UploadAndDisplayImage;