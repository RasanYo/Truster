import { useState } from "react";
import InputField from "./InputField";
import { IoMdMap } from "react-icons/io"
import "../styles/home.css"

const Home = () => {

    const [adress, setAdress] = useState("")
    const [date, setDate] = useState("")


    const handleSubmit = e => {
        e.preventDefault()
    }

    return ( 
        <div className="home">
            <div className="text-container">
                <h1>Save efforts, let locals do your visits</h1>
                <h2>Moving to a new city ? Having doubts about your new home offers ?</h2>
                <h3>Save your time and your money, get someone living nearby to visit your new place before moving in.</h3>
            </div>
            <form className="search" onSubmit={handleSubmit}>
                <InputField
                    id="city"
                    value={adress} 
                    setValue={setAdress} 
                    placeholder="What adress are you moving to ?"
                    logo={<IoMdMap size={24} />}
                />
                <InputField
                    id="date"
                    value={date} 
                    setValue={setDate} 
                    inputType="date"
                    title="Starting from"
                    logo={<IoMdMap size={24} />}
                />
            </form>
        </div>
    );
}
 
export default Home;