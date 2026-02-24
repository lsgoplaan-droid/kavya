/**
 * Kavya — structured logger
 *
 * Keeps the last MAX_ENTRIES log entries in memory so Claude / a developer
 * can read them from the admin page without needing a backend.
 *
 * In development (__DEV__ === true) every entry is also printed to the
 * native console so it appears in Metro / Logcat / Xcode.
 */

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogEntry {
  ts: string;       // ISO timestamp
  level: LogLevel;
  tag: string;      // module name, e.g. "claudeService"
  message: string;
  data?: string;    // JSON-serialised extra context (never raw objects to avoid circular refs)
}

const MAX_ENTRIES = 300;
const entries: LogEntry[] = [];

function record(level: LogLevel, tag: string, message: string, extra?: unknown) {
  const entry: LogEntry = {
    ts: new Date().toISOString(),
    level,
    tag,
    message,
    data: extra !== undefined ? JSON.stringify(extra, null, 0) : undefined,
  };

  entries.push(entry);
  if (entries.length > MAX_ENTRIES) entries.shift();

  if (__DEV__) {
    const line = `[${entry.ts}] [${level}] [${tag}] ${message}${entry.data ? ' ' + entry.data : ''}`;
    if (level === 'ERROR') console.error(line);
    else if (level === 'WARN') console.warn(line);
    else console.log(line);
  }
}

export const logger = {
  debug: (tag: string, message: string, extra?: unknown) => record('DEBUG', tag, message, extra),
  info:  (tag: string, message: string, extra?: unknown) => record('INFO',  tag, message, extra),
  warn:  (tag: string, message: string, extra?: unknown) => record('WARN',  tag, message, extra),
  error: (tag: string, message: string, extra?: unknown) => record('ERROR', tag, message, extra),

  /** Returns a snapshot of all buffered entries, newest first. */
  getEntries: (): LogEntry[] => [...entries].reverse(),

  /** Clears the in-memory buffer. */
  clear: () => { entries.length = 0; },
};
