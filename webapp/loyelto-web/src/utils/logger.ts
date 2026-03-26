type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

/**
 * Context object for structured logging.
 */
interface LogContext {
  /** Additional context key-value pairs */
  [key: string]: unknown;
}

/**
 * Structured logger for the application.
 * In development, logs to console. In production, could be extended to send to monitoring service.
 */
class Logger {
  private isDev = import.meta.env.DEV;

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...context,
    });
  }

  /**
   * Debug level logging - only in development.
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  /**
   * Info level logging.
   */
  info(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  /**
   * Warning level logging.
   */
  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  /**
   * Error level logging.
   */
  error(message: string, error?: Error, context?: LogContext): void {
    console.error(
      this.formatMessage('error', message, {
        ...context,
        error: error?.message,
        stack: error?.stack,
      })
    );
  }

  /**
   * Critical error logging - for ErrorBoundary and fatal errors.
   */
  critical(message: string, error?: Error, context?: LogContext): void {
    console.error(
      this.formatMessage('critical', message, {
        ...context,
        error: error?.message,
        stack: error?.stack,
      })
    );
    // TODO: Send to monitoring service (Sentry, etc.)
  }
}

export const logger = new Logger();
