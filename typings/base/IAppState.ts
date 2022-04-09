import { IUser } from '.';

export default interface IAppStore {
    darkMode: boolean;
    error: string;
    isAuthenticated: boolean;
    currentUser: IUser | undefined;
}
