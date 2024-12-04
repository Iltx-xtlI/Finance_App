import chalk from 'chalk';

export interface APIError {
  response?: {
    data?: any;
  };
  message?: string;
}

export class Logger {
  static success(message: string) {
    console.log(chalk.green('✓'), chalk.green(message));
  }

  static error(message: string, error?: APIError) {
    console.error(chalk.red('✗'), chalk.red(message));
    if (error?.response?.data) {
      console.error(chalk.red('API Error:'), JSON.stringify(error.response.data, null, 2));
    } else if (error?.message) {
      console.error(chalk.red('Error details:'), error.message);
    }
  }

  static info(message: string) {
    console.log(chalk.blue('ℹ'), chalk.blue(message));
  }

  static warn(message: string | Error) {
    console.log(chalk.yellow('⚠'), chalk.yellow(message));
  }

  static debug(message: string, data?: any) {
    if (process.env.DEBUG) {
      console.log(chalk.gray('🔍'), chalk.gray(message));
      if (data) {
        console.log(chalk.gray(JSON.stringify(data, null, 2)));
      }
    }
  }
} 