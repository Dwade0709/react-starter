import api from '../api';
import { loadRefreshToken, fakeApiResponse, saveRefreshToken, saveToken, setRefreshTimeout } from './utils';

const ENDPOINT = 'auth/refresh';
const METHOD = 'refresh()';

export async function refreshByAxios() {
    const payload = {
        refresh_token: loadRefreshToken(),
    };
    try {
        const res = process.env.REACT_APP_FAKEAPI ? fakeApiResponse() : await api.axios.post(ENDPOINT, payload);
        const { data } = res;
        log.warn(`${METHOD} -`, data);

        saveToken(data?.access_token);
        saveRefreshToken(data?.refresh_token);
        setRefreshTimeout(data?.expires);
        log.warn(METHOD, '- token expires in', +data?.expires / 1000 / 60, 'minutes');

        return data;
    } catch (error) {
        log.error(`${METHOD} -`, error);
        api.auth.logout(); // Logout user and reload Application
    }
    return undefined;
}

export default refreshByAxios;
