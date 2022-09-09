import "../styles/progressbar.css"

const ProgressBar = ({steps}) => {
    return ( 
        <div className="progress-bar">
            {steps.map((step, index) => {
                return <div className="step-container" key={index}>
                    {index !== 0 && <div className="bridge"/>}
                    <div className="step">
                        <div className="circle"/>
                        <h5>{step}</h5>
                    </div>
                </div>
            })}
        </div>
     );
}
 
export default ProgressBar;