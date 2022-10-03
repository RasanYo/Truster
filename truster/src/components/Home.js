import { useState } from "react";
import InputLocation from "./forms/InputLocation"
import { IoMdMap } from "react-icons/io"
import { BsCalendar3 } from "react-icons/bs"
import { AiOutlineArrowRight } from "react-icons/ai"
import "../styles/home.css"
import city from "../res/city drawing.png"
import Input from "./forms/Input";

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
                        logo={<IoMdMap size={34} />}
                    />
                    <Input 
                        name="date"
                        title="Starting from"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        inputProps={{type: 'date', requires: 'true'}}
                        className="fit-width space-right row-container"
                        logo={<BsCalendar3 size={34} />}
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