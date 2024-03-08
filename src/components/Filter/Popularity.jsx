import { useDispatch, useSelector } from 'react-redux';
import { changePopularity } from '../../context';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

export function Popularity() {
    const dispatch = useDispatch()
    const popularity = useSelector(state => state.popularity)

    return (
        <FormControl sx={{ mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label">Popularity</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="none"
                name="radio-buttons-group"
                value={popularity}
                onChange={(event) => dispatch(changePopularity(event.target.value))}
            >
                <FormControlLabel value="none" control={<Radio />} label="None" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
        </FormControl>
    )
}
