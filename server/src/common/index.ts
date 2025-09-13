import chalk from 'chalk';

export const consoleInfo = (arg: object | string) => { console.log(chalk.cyan(`[INFO]`), typeof arg === 'string' ? chalk.blueBright(arg) : chalk.blueBright(JSON.stringify(arg))); };
export const consoleWarn = (arg: object | string) => { console.log(chalk.yellow(`[INFO]`), typeof arg === 'string' ? chalk.yellowBright(arg) : chalk.yellowBright(JSON.stringify(arg))); };
export const consoleError = (arg: object | string) => { console.log(chalk.red(`[INFO]`), typeof arg === 'string' ? chalk.redBright(arg) : chalk.redBright(JSON.stringify(arg))); };
