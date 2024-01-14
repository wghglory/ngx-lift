import {pipe, tap} from 'rxjs';

// Define a type for different logger functions
type LoggerType = 'count' | 'debug' | 'dir' | 'log' | 'table';

// Map each LoggerType to its corresponding console function
const getLoggerByType = (loggerType: LoggerType): ((value: LoggerType) => void) => {
  switch (loggerType) {
    case 'count':
      return console.count;
    case 'debug':
      return console.debug;
    case 'dir':
      return console.dir;
    case 'log':
      return console.log;
    case 'table':
      return console.table;
    default:
      return console.log; // Default to console.log for unknown types
  }
};

/**
 * Logger operator for RxJS observables.
 *
 * @param loggerType The type of logger to be used: 'count', 'debug', 'dir', 'log', 'table'.
 *                   Defaults to 'log' if not provided or if an unknown type is specified.
 * @returns An RxJS operator function that logs values using the specified console function.
 */
export const logger = (loggerType: LoggerType = 'log') => pipe(tap(getLoggerByType(loggerType)));
