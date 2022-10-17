import MultiplePageForm from "./MultiplePageForm";

const MultiplePageFormContainer = ({title=null, children, onSubmit}) => {

    return ( 
        <div>
            <h1>
                {title}
            </h1>
            <MultiplePageForm onSubmit={onSubmit}>
                {children}
            </MultiplePageForm>
        </div>
     );
}
 
export default MultiplePageFormContainer;