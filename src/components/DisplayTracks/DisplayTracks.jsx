import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_SEARCH_URL } from '../../api';
import { addFilteredTracks, addTrack } from '../../context';
import GridView from './GridView';
import ListView from './ListView';
import { IconButton, Typography, Box } from '@mui/material';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AppsIcon from '@mui/icons-material/Apps';

export function DisplayTracks() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const { token_type, access_token } = useSelector(state => state.userToken); // Get user token details from Redux state
    const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and list view

    const handleChangeView = () => { // Function to toggle grid/list view
        setIsGridView(!isGridView);
    }

    useEffect(() => { // Fetch default tracks when component mounts
        async function getDefaultTrack() {
            try {
                const response = await fetch(DEFAULT_SEARCH_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token_type} ${access_token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    dispatch(addTrack(data?.artists?.items)); // Dispatch action to add default tracks
                    dispatch(addFilteredTracks(data?.artists?.items)); // Dispatch action to add filtered tracks
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDefaultTrack();
    }, [token_type, access_token])

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width='100%' p={2} position='relative'>
                <Typography variant="h5" sx={{ fontWeight: 700, mx: 'auto', }}>
                    {isGridView ? 'Grid View' : 'List View'}
                </Typography>
                <IconButton aria-label="Grid/List" onClick={handleChangeView} sx={{ position: 'absolute', right: 80 }}>
                    {
                        isGridView ? <ViewHeadlineIcon /> : <AppsIcon />
                    }
                </IconButton>
            </Stack>
            {
                isGridView ? <GridView /> : <ListView />
            }
        </>
    )
};
