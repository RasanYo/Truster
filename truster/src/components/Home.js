import { useState } from "react";
import InputField from "./InputField";
import InputLocation from "./InputLocation"
import { IoMdMap } from "react-icons/io"
import { BsCalendar3 } from "react-icons/bs"
import { AiOutlineArrowRight } from "react-icons/ai"
import "../styles/home.css"
// import city from "../res/city drawing.png"

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
            <div className="content-container">
                <img 
                    src={city} 
                    alt="city"
                    width={400}
                />

                <form className="search">
                    <InputLocation
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
                        logo={<BsCalendar3 size={24} />}
                    />
                    <div className="button">
                        <AiOutlineArrowRight 
                            onClick={handleSubmit}
                            size={20}
                            strikethroughThickness={2}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Home;