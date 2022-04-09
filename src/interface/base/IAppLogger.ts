import { RootLogger } from "loglevel";

export interface IAppLogger extends RootLogger {
    time: (id: string) => number | false;
    timeEnd: (id: string) => DOMHighResTimeStamp;
}
