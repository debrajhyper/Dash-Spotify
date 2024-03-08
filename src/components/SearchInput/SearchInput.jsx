import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredTracks, addTrack } from "../../context";
import { useDebounce } from "../../hooks/useDebounce";
import { ARTIST_SEARCH_URL, SEARCH_URL } from "../../api";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function SearchInput() {
    const dispatch = useDispatch();
    const { token_type, access_token } = useSelector(state => state.userToken)
    const popularity = useSelector(state => state.popularity);
    const country = useSelector(state => state.country);
    const [searchQuery, setSearchQuery] = useState("");
    const debounceSearch = useDebounce(searchQuery);

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (debounceSearch === '') return
        async function search() {
            try {
                const response = await fetch(`${SEARCH_URL}${debounceSearch}&type=artist`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `${token_type} ${access_token}`,
                    }
                });
                const data = await response.json();
                if (popularity === 'none') {
                    getAllTracks(data?.artists?.items[0]?.id)
                }
                if (popularity === 'low') {
                    getAllTracks(data?.artists?.items.filter(artist => artist?.popularity < 20).sort((a, b) => a?.popularity - b?.popularity)[0]?.id)
                }
                if (popularity === 'medium') {
                    const filteredData = data?.artists?.items.filter(artist => artist?.popularity > 20 && artist?.popularity < 80)
                    const midElement = Math.floor(filteredData.length / 2);
                    getAllTracks(filteredData[midElement]?.id);
                }
                if (popularity === 'high') {
                    getAllTracks(data?.artists?.items.filter(artist => artist?.popularity > 80).sort((a, b) => b?.popularity - a?.popularity)[0]?.id)
                }
            } catch (error) {
                console.log(error)
            }
        }
        search();
    }, [debounceSearch, popularity, country])

    async function getAllTracks(id) {
        try {
            const response = await fetch(`${ARTIST_SEARCH_URL}${id}/albums?include_groups=album&market=${country}&limit=50`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addTrack(data?.items))
                dispatch(addFilteredTracks(data?.items))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormControl sx={{ padding: '0 5rem' }} fullWidth>
            <TextField
                size="small"
                variant="outlined"
                onChange={handleChange}
                placeholder="Search for tracks..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
};
