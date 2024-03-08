import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredTracks, addTrack } from "../../context";
import { useDebounce } from "../../hooks/useDebounce";
import { ARTIST_SEARCH_URL, SEARCH_URL } from "../../api";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function SearchInput() {
    const dispatch = useDispatch();
    const { token_type, access_token } = useSelector(state => state.userToken); // Retrieve user token from state
    const popularity = useSelector(state => state.popularity); // Get the selected popularity from state
    const country = useSelector(state => state.country); // Get the selected country from state
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const debounceSearch = useDebounce(searchQuery); // Debounced search query

    // Handle input change event
    const handleChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    // Effect to search for artists based on debounced search query, popularity, and country
    useEffect(() => {
        if (debounceSearch === '') return; // Exit if search query is empty

        async function search() {
            try {
                // Fetch artists based on search query
                const response = await fetch(`${SEARCH_URL}${debounceSearch}&type=artist`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `${token_type} ${access_token}`,
                    }
                });
                const data = await response.json(); // Parse response data

                // Handle different popularity levels
                if (popularity === 'none') {
                    getAllTracks(data?.artists?.items[0]?.id); // Get tracks for the first artist
                }
                if (popularity === 'low') {
                    // Get tracks for the least popular artist
                    getAllTracks(data?.artists?.items.filter(artist => artist?.popularity < 20).sort((a, b) => a?.popularity - b?.popularity)[0]?.id);
                }
                if (popularity === 'medium') {
                    // Get tracks for an artist with medium popularity
                    const filteredData = data?.artists?.items.filter(artist => artist?.popularity > 20 && artist?.popularity < 80);
                    const midElement = Math.floor(filteredData.length / 2);
                    getAllTracks(filteredData[midElement]?.id);
                }
                if (popularity === 'high') {
                    // Get tracks for the most popular artist
                    getAllTracks(data?.artists?.items.filter(artist => artist?.popularity > 80).sort((a, b) => b?.popularity - a?.popularity)[0]?.id);
                }
            } catch (error) {
                console.log(error); // Log any errors
            }
        }
        search(); // Execute the search function
    }, [debounceSearch, popularity, country]); // Dependencies for the effect

    // Function to fetch all tracks for a given artist ID
    async function getAllTracks(id) {
        try {
            // Fetch albums for the artist ID
            const response = await fetch(`${ARTIST_SEARCH_URL}${id}/albums?include_groups=album&market=${country}&limit=50`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `${token_type} ${access_token}`,
                }
            });
            const data = await response.json(); // Parse response data

            // If response is successful, dispatch actions to add tracks to state
            if (response.ok) {
                dispatch(addTrack(data?.items)); // Add all tracks
                dispatch(addFilteredTracks(data?.items)); // Add filtered tracks
            }
        } catch (error) {
            console.log(error); // Log any errors
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
