import api from '../api';
import { clearAuthData, fakeApiResponse, loadRefreshToken } from './utils';

const ENDPOINT = 'auth/logout';
const METHOD = 'logout()';

export async function logoutByAxios() {
    const data = {
        refresh_token: loadRefreshToken(),
    };
    try {
        process.env.REACT_APP_FAKEAPI ? fakeApiResponse() : await api?.axios?.post(ENDPOINT, data);
    } catch (error) {
        log.error(`${METHOD} -`, error);
    } finally {
        clearAuthData();
        window.location.href = '/';
    }
    return undefined;
}

export default logoutByAxios;
