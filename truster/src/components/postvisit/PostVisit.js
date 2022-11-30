import AutoComplete from "../Autocomplete";
import Input from "../forms/Input";

const PostVisit = ({
    setAddress,
    data, handleChange,
    onSubmit
}) => {
    return ( 
        <form onSubmit={onSubmit}>
            <AutoComplete
                setAddress={setAddress}
                inputProps={{placeholder: "Type address", className: 'location-search-input max-width', required: true}}
            />
            <span>
                <Input
                    name="start"
                    title="Between"
                    value={data.start}
                    onChange={handleChange}
                    inputProps={{type: "date"}}
                />
                <Input
                    name="end" 
                    title="And"
                    value={data.end}
                    onChange={handleChange}
                    inputProps={{type: "date"}}
                />
            </span>
            <div className="input styled-textarea">
                <div className="container">
                    <h5>Description</h5>
                    <textarea
                        name="description"
                        value={data.description}
                        rows={10}
                        onChange={handleChange}
                        placeholder="Describe here what you would expect from your trusty"
                    />
                </div>
            </div>
            <button>Post</button>
        </form>
     );
}
 
export default PostVisit;