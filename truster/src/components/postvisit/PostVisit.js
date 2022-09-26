import Input from '../forms/Input'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import { useContext } from 'react';
import { ErrorContext } from './PostVisitContainer';
import AutoComplete2 from '../AutoComplete';

const PostVisit = ({
    address, setAddress,
    timeframe, handleChangeTimeframe,
    description, handleChangeDescription,
    onSubmit
}) => {

    const showErrors = useContext(ErrorContext)

    return ( 
        <form onSubmit={onSubmit}>
            <h3>Where is the visit taking place ?</h3>
            <div className="input space-bottom">
                <div className="container max-width ">
                    <h5>Address</h5>
                    <AutoComplete2 
                        setAddress={setAddress}
                        inputProps={{placeholder: "Type address", className: 'location-search-input max-width', required: true}}
                    />
                </div>
                <h6 className="err-msg" style={{
                    opacity: showErrors && !address  ? '1' : '0'
                }}>*Please enter a valid address</h6>
            </div>
            
            <div className="row-container">
                <Input
                    name="start"
                    title="Start"
                    value={timeframe.start}
                    onChange={handleChangeTimeframe}
                    error={showErrors && (timeframe.start.length === 0 || new Date(timeframe.start).getTime() > new Date(timeframe.end).getTime())}
                    inputProps={{ required:true, type: 'date' }}
                    className="space-right fit-width"
                />
                <Input
                    name="end"
                    title="End"
                    value={timeframe.end}
                    onChange={handleChangeTimeframe}
                    error={showErrors && (timeframe.end.length === 0 || new Date(timeframe.start).getTime() > new Date(timeframe.end).getTime())}
                    inputProps={{ required:true, type: 'date' }}
                    className="fit-width"
                />
            </div>
            <div className="input styled-textarea">
                <div className="container">
                    <h5>Description</h5>
                    <textarea
                        name="description"
                        value={description}
                        rows={10}
                        onChange={handleChangeDescription}
                        placeholder="Describe here what you would expect from your trusty"
                    />
                </div>
                
            </div>

            <button className="btn">
                <AiOutlinePlusSquare size={20} />
                <h6>Post</h6>
            </button>
            
            
        </form>
     );
}
 
export default PostVisit;