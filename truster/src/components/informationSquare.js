import "../styles/informationSquare.css"

const InformationSquare = ({title, value, className=""}) => {
    return ( 
        <div className={`info-container ${className}`}>
                <h5>{title}</h5>
                <div className="info-content">{value}</div> 
            
        </div>
     );
}
 
export default InformationSquare;