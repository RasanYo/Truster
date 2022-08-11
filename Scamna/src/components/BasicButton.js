const BasicButton = ({ title, handleClick }) => {
    return ( 
        <button onClick={() => handleClick()}>
            {title}
        </button>
     );
}
 
export default BasicButton;