import { useSelector } from 'react-redux';
import { Card, Box, Typography, CardContent, CardMedia, Link, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function GridView() {
    const filteredTracks = useSelector(state => state.filteredTracks);
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }} px={{ xs: 0, md: 2, lg: 5 }}>
            {
                filteredTracks?.length === 0
                    ? <Typography
                        variant="h4"
                        fontWeight={600}
                        mt={10}
                    >
                        No tracks found
                    </Typography>
                    : filteredTracks?.map((item, index) => {
                        const { images, name, type } = item
                        return <Grid xs={2} sm={4} md={4} lg={3} key={index}>
                            <Card sx={{ borderRadius: 4, p: 2 }}>
                                <CardMedia
                                    sx={{ borderRadius: 3 }}
                                    component="img"
                                    height="200"
                                    image={images[1]?.url}
                                    alt={name}
                                />
                                <CardContent sx={{ p: 0, mb: 0, mt: 2 }}>
                                    <Tooltip title={name} placement='top-start'>
                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                            sx={{ overflow: 'hidden', textWrap: 'nowrap' }}
                                        >
                                            {name}
                                        </Typography>
                                    </Tooltip>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative"
                                    }}
                                >
                                    <Link
                                        href="#"
                                        underline="always"
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        {type}
                                    </Link>
                                    <IconButton aria-label="play/pause" sx={{ position: "absolute", right: 3, bottom: -5 }}>
                                        <PlayArrowIcon sx={{ height: 'auto', width: 30 }} />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    })
            }
        </Grid>
    )
}
