import { useCallback, useRef } from 'react';
import ReactIdleTimer, { IdleTimerAPI } from 'react-idle-timer';
import api from '../../api';

type Props = Readonly<{
    onLogout?: () => void;
}>

/**
 * WatchDog timer to track inactivity and logout current user
 */
export const IdleTimer = ({ onLogout }: Props) => {
    const refIdleTimer = useRef<IdleTimerAPI>();

    const doLogout = useCallback(() => {
        if (onLogout && typeof onLogout === 'function') {
            onLogout();
        }

        api?.auth?.logout();
        // TODO: Do we need call dispatch({ type: 'LOG_OUT' }); here?
    }, [onLogout]);

    const onUserIdle = () => {
        log.warn('User is idle for long time...');
        doLogout();
    };

    const onUserAction = () => {
        log.warn('User action detected, idle timer reset');
        refIdleTimer?.current?.reset();
    }

    const onUserActiveAgain = () => {
        log.warn('User is active again, time remaining:', refIdleTimer?.current?.getRemainingTime());
    }

    return (
        <ReactIdleTimer
            ref={() => refIdleTimer}
            timeout={1000 * 60 * 60 * 3} // Idle timeout in 3 hours
            debounce={1000 * 30} // Check User activity every 30 seconds
            // timeout={1000 * 10} // Idle timeout in 10 seconds (debug)
            // debounce={1000 * 3} // Check User activity every 3 seconds (debug)
            onIdle={onUserIdle}
            onAction={onUserAction}
            onActive={onUserActiveAgain}
        />
    );
}
