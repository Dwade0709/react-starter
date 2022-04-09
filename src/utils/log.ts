/**
 * Improved LogLevel to use in the Application instead of console
 */
import log, { LogLevelDesc } from 'loglevel';
import { IAppLogger } from '../interface/base/IAppLogger';

const logger = log as IAppLogger;
// Apply "level of logging" from the .env variable
log.setLevel(process.env.LOG_LEVEL as LogLevelDesc || process.env.REACT_APP_LOG_LEVEL as LogLevelDesc || log.levels.ERROR as LogLevelDesc);
log.info('log.level:', Object.keys(log.levels)[log.getLevel()]);

const _timers: any = {};

/**
 * Analog of console.time()
 * @param {string} id
 */
logger.time = (id: string) => {
    const time = window.performance.now();
    const timerName = `${id}_start`;

    if (_timers[timerName]) {
        log.warn(`Timer "${id}" already exists. Call log.timeEnd("${id}") to reset the timer.`);
        return false;
    }

    _timers[timerName] = time; // Save Timer in the Cache
    return time;
};

/**
 * Analog of console.timeEnd()
 * @param {string} id
 */
logger.timeEnd = (id: string) => {
    const timerName = `${id}_start`;
    const timerStart = _timers[timerName];
    if (!timerStart) {
        log.warn(`Timer "${id}" does not exist. Call log.time("${id}") first to create the timer.`);
        return -1;
    }
    const timeEnd = window.performance.now();
    const totalTime = timeEnd - timerStart;

    delete _timers[timerName];
    log.info(`${id} - executionTime:`, totalTime);
    return totalTime;
};

export default logger;
