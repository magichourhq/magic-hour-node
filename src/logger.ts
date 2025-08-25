/**
 * Logging levels for the SDK
 */
export const LogLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
} as const;

export type PossibleLogLevel = keyof typeof LogLevel;

/**
 * Logger interface for the Magic Hour SDK
 */
export interface Logger {
  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void;

  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void;

  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void;

  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void;
}

/**
 * Configuration options for the logger
 */
export interface LoggerConfig {
  level: PossibleLogLevel;
  logger?: Logger;
  includeTimestamp?: boolean;
  includeRequestId?: boolean;
}

/**
 * Default logger implementation using console
 */
class ConsoleLogger implements Logger {
  private config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  private shouldLog(level: PossibleLogLevel): boolean {
    return level <= this.config.level;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = this.config.includeTimestamp
      ? `[${new Date().toISOString()}]`
      : "";
    const levelStr = `[${level.toUpperCase()}]`;
    return [timestamp, levelStr, message].filter(Boolean).join(" ");
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", message), ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message), ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message), ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message), ...args);
    }
  }
}

/**
 * No-operation logger for when logging is disabled
 */
class NoOpLogger implements Logger {
  error(): void {}
  warn(): void {}
  info(): void {}
  debug(): void {}
}

/**
 * Create a logger instance based on configuration
 */
export function createLogger(config: LoggerConfig): Logger {
  if (config.level === "none") {
    return new NoOpLogger();
  }

  if (config.logger) {
    return config.logger;
  }

  return new ConsoleLogger(config);
}

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  level: "info",
  includeTimestamp: false,
  includeRequestId: false,
};
