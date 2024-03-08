import { useSelector } from 'react-redux';
import { Stack } from '@mui/system'
import { Card, Box, Typography, CardContent, CardMedia, Link, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function ListView() {
    const filteredTracks = useSelector(state => state.filteredTracks);
    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width='100%'
        >
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
                        return (
                            <Card sx={{ borderRadius: 4, p: 2, display: 'flex', width: { xs: '100%', md: '60%' } }} key={index}>
                                <CardMedia
                                    sx={{ borderRadius: 3, minWidth: 200, maxWidth: 200 }}
                                    component="img"
                                    height="150"
                                    image={images[1]?.url}
                                    alt={name}
                                />
                                <CardContent sx={{ px: 2, mb: 0, mt: 0, width: '100%' }}>
                                    <Tooltip title={name} placement='top-start'>
                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                            sx={{ wordWrap: 'break-word' }}
                                        >
                                            {name}
                                        </Typography>
                                    </Tooltip>
                                    <Link
                                        href="#"
                                        underline="always"
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        {type}
                                    </Link>
                                </CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        width: "10%",
                                    }}
                                >
                                    <IconButton aria-label="play/pause" sx={{ position: "absolute", right: 12, bottom: 0 }}>
                                        <PlayArrowIcon sx={{ height: 'auto', width: 30 }} />
                                    </IconButton>
                                </Box>
                            </Card>
                        )
                    })
            }
        </Stack>
    )
}
