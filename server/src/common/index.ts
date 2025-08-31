import chalk from 'chalk';

export const consoleInfo = (arg: string | object) => console.log(chalk.cyan(`[INFO]`), typeof arg === 'string' ? chalk.blueBright(arg) : chalk.blueBright(JSON.stringify(arg)));
export const consoleWarn = (arg: string | object) => console.log(chalk.yellow(`[INFO]`), typeof arg === 'string' ? chalk.yellowBright(arg) : chalk.yellowBright(JSON.stringify(arg)));
export const consoleError = (arg: string | object) => console.log(chalk.red(`[INFO]`), typeof arg === 'string' ? chalk.redBright(arg) : chalk.redBright(JSON.stringify(arg)));
