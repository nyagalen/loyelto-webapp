import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log debug messages in development', () => {
    logger.debug('Test debug message', { key: 'value' });
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log info messages in development', () => {
    logger.info('Test info message');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    logger.warn('Test warning');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages with error object', () => {
    const error = new Error('Test error');
    logger.error('Something failed', error, { context: 'test' });
    expect(console.error).toHaveBeenCalled();
  });

  it('should log critical messages', () => {
    const error = new Error('Critical failure');
    logger.critical('System crash', error);
    expect(console.error).toHaveBeenCalled();
  });
});
