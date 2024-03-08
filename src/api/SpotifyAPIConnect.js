// Define the URL to get the access token from Spotify API
export const GET_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

// Define the base URL for searching on Spotify API
export const SEARCH_URL = "https://api.spotify.com/v1/search?q=";

// Define the default search URL for searching artists of type 'rock'
export const DEFAULT_SEARCH_URL = "https://api.spotify.com/v1/search?q=rock&type=artist";

// Define the base URL for fetching artist information from Spotify API
export const ARTIST_SEARCH_URL = "https://api.spotify.com/v1/artists/";

// Define the URL to get the available markets from Spotify API
export const GET_MARKET_URL = "https://api.spotify.com/v1/markets";


// Define the configurations for requesting an access token from Spotify API
export const configs = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=386d23eddd0f42298f3b63d49ca4bb7f&client_secret=aec72b3f8089489d8a5b04c680972342`
}