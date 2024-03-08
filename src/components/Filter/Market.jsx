import { useDispatch, useSelector } from 'react-redux';
import { changeCountry } from '../../context';
import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

export function Market() {
    const dispatch = useDispatch();
    const markets = useSelector(state => state.markets);
    const country = useSelector(state => state.country);

    return (
        <FormControl sx={{ mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label">Market/Country</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="none"
                name="radio-buttons-group"
                value={country}
                onChange={(event) => dispatch(changeCountry(event.target.value))}
            >
                {
                    markets.map((country, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={country}
                                control={<Radio />}
                                label={country}
                            />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    )
}
