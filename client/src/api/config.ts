export const BASE_URL = 'http://localhost:3001/api';

export const fetchOptions = {
    credentials: 'include' as RequestCredentials,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
};

export const PAGES_URL = {
    MAIN: `/`,
    REGISTER_HOST: `/register-host`,
    LOGIN: `/login`,
    REGISTER: `/register`,
    FAVOURITES: `/favourites`,
    PROFILE: `/profile`,
    ORDERS: `/orders`
}