import Input from '../forms/Input'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import { useContext } from 'react';
import { ErrorContext } from './PostVisitContainer';

const PostVisit = ({
    adress, handleChangeAdress,
    timeframe, handleChangeTimeframe,
    description, handleChangeDescription,
    onSubmit
}) => {

    const showErrors = useContext(ErrorContext)

    return ( 
        <form onSubmit={onSubmit}>
            <h3>Where is the visit taking place ?</h3>
            <div className="row-container">
                <Input
                    name="number"
                    title="Street number"
                    value={adress.number}
                    onChange={handleChangeAdress}
                    error={showErrors && adress.number.length === 0}
                    inputProps={{ type: 'number' }}
                    className="space-right fit-width"
                />
                <Input
                    name="street"
                    title="Street *"
                    value={adress.street}
                    onChange={handleChangeAdress}
                    error={showErrors && adress.street.length === 0}
                    inputProps={{ required:true }}
                    className="street"
                />
            </div>
            <Input
                name="additionalInfo"
                title="Additional information"
                value={adress.additionalInfo}
                onChange={handleChangeAdress}
            />
            <div className="row-container">
                <Input
                    name="npa"
                    title="NPA *"
                    value={adress.npa}
                    onChange={handleChangeAdress}
                    error={showErrors && adress.npa.length === 0}
                    inputProps={{ required:true, type: 'number' }}
                    className="number fit-width"
                />
                <Input
                    name="city"
                    title="City *"
                    value={adress.city}
                    onChange={handleChangeAdress}
                    error={showErrors && adress.city.length === 0}
                    inputProps={{ required:true }}
                    className="space-right"
                />
                <Input
                    name="country"
                    title="Country *"
                    value={adress.country}
                    onChange={handleChangeAdress}
                    error={showErrors && adress.country.length === 0}
                    inputProps={{ required:true }}
                />
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
            <div className="input">
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