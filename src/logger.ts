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
    const timestamp = `[${new Date().toISOString()}]`;
    const levelStr = `[${level.toUpperCase()}]`;
    return [timestamp, levelStr, message].join(" ");
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
 * Get log level from environment variable or default
 */
function getLogLevelFromEnv(): PossibleLogLevel {
  const envLevel = process.env["MAGIC_HOUR_LOG_LEVEL"]?.toLowerCase();
  if (envLevel && envLevel in LogLevel) {
    return envLevel as PossibleLogLevel;
  }
  return "info";
}

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  level: "info",
};

/**
 * Create a logger instance based on configuration
 *
 */
export function setupLogger(config: LoggerConfig): Logger {
  globalForLogger.logger =
    config.level === "none" ? new NoOpLogger() : new ConsoleLogger(config);
  return globalForLogger.logger;
}

const globalForLogger = globalThis as unknown as {
  logger: Logger | undefined;
};

export function getLogger(): Logger {
  if (!globalForLogger.logger) {
    const config: LoggerConfig = {
      level: getLogLevelFromEnv(),
    };
    globalForLogger.logger = setupLogger(config);
  }
  return globalForLogger.logger;
}
