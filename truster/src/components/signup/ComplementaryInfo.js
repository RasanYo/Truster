import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import useData from "../../hooks/useData";
import Input from "../forms/Input";
import MultiplePageFormContainer from "../multiple_page_form/MultiplePageFormContainer";

const ComplementaryInfo = () => {

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const {data, handleChange} = useData({
        gender: "Others",
        dob: "",
        aboutMe: ""
    })

    const onSubmit = e => {
        e.preventDefault()
        user.updatePersonalInformation(data).then(() => navigate("/"))

    }

    return ( 
        <MultiplePageFormContainer title="We just need a couple additional information about you" onSubmit={onSubmit}>
            <div>
                <label>Gender:</label>
                <select
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="Other">Others</option> 
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <Input 
                title="Date of birth"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                inputProps={{required: true}}
            />
            <div className="input styled-textarea">
                <div className="container">
                    <h5>About you</h5>
                    <textarea
                        name="aboutMe"
                        value={data.aboutMe}
                        rows={10}
                        onChange={handleChange}
                        placeholder="Tell us about you"
                    />
                </div>
            </div>
        </MultiplePageFormContainer>
     );
}
 
export default ComplementaryInfo;