import "../styles/informationSquare.css"

const InformationSquare = ({title, value, className="", logo=""}) => {
    return ( 
        <div className={`info-container ${className}`}>
                <h5>{title}</h5>
                <div className="info-content">{value}</div> 
                <span>
                    {logo}
                </span>
            
        </div>
     );
}
 
export default InformationSquare;