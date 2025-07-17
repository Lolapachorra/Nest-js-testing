export class Log {
  static info(message: string) {
    console.info(`[${new Date().toISOString()}] ${message}`);
  }

  static error(message: string, error?: unknown) {
    if (error !== undefined) {
      console.error(`[${new Date().toISOString()}] ${message}`, error);
    } else {
      console.error(`[${new Date().toISOString()}] ${message}`);
    }
  }
}
