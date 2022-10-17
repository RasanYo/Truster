import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"



const MultiplePageForm = ({children, onSubmit}) => {

    const [activePage, setActivePage] = useState(0)
    const numberOfPages = children ? children.length : 0

    const handleBack = e => {
        e.preventDefault()
        setActivePage(activePage - 1)
    }

    const handleNext = e => {
        e.preventDefault()
        setActivePage(activePage + 1)
    }

    return ( 
        <form>
            {children && children.map((child, index) => {
                return index === activePage ? child : null
            })}

            <div className="buttons">
                {activePage !== 0 && <button className="btn back" onClick={handleBack}>
                    <AiOutlineArrowLeft size={20}/>
                    <h6>Back</h6>
                </button>}
                <button className="btn next" onClick={ activePage === numberOfPages - 1 ? onSubmit : handleNext}>
                    <h6>Next</h6>
                    <AiOutlineArrowRight size={20}/>
                </button>
            </div>
        </form> 
     );
}
 
export default MultiplePageForm;