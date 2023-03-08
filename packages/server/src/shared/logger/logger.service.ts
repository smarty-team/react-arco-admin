import { Injectable, Scope } from '@nestjs/common';
import { createLogger, Logger, transports, format } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context?: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
      ),

      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  error(
    ctx: any,
    message: string,
    meta?: Record<string, any>,
  ): Logger {

    return this.logger.error({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  warn(
    ctx: any,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.warn({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  debug(
    ctx: any,
    message: string,
    meta?: Record<string, any>,
  ): Logger {

    return this.logger.debug({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  verbose(
    ctx: any,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.verbose({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }

  log(
    ctx: any,
    message: string,
    meta?: Record<string, any>,
  ): Logger {
    return this.logger.info({
      message,
      contextName: this.context,
      ctx,
      ...meta,
    });
  }
}
