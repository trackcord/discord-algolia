import { ansiColors } from "./data"

enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  CUSTOM = "CUSTOM",
}

type ColorMap = {
  [K in LogLevel]: string
}

export default class Logger {
  private static readonly colorMap: ColorMap = {
    [LogLevel.INFO]: ansiColors.blue,
    [LogLevel.WARN]: ansiColors.yellow,
    [LogLevel.ERROR]: ansiColors.red,
    [LogLevel.SUCCESS]: ansiColors.green,
    [LogLevel.CUSTOM]: "",
  }

  private constructor() {
    throw new Error("Logger cannot be instantiated")
  }

  private static format(
    level: LogLevel,
    message: string,
    color: string
  ): string {
    return `${color}[ ${level} ]${ansiColors.reset} ${message}`
  }

  private static log(level: LogLevel, message: string, color: string): void {
    console.log(Logger.format(level, message, color))
  }

  static info(message: string): void {
    Logger.log(LogLevel.INFO, message, Logger.colorMap[LogLevel.INFO])
  }

  static warn(message: string): void {
    Logger.log(LogLevel.WARN, message, Logger.colorMap[LogLevel.WARN])
  }

  static error(message: string): void {
    Logger.log(LogLevel.ERROR, message, Logger.colorMap[LogLevel.ERROR])
  }

  static success(message: string): void {
    Logger.log(LogLevel.SUCCESS, message, Logger.colorMap[LogLevel.SUCCESS])
  }

  static custom(message: string, color: string): void {
    Logger.log(LogLevel.CUSTOM, message, color)
  }
}
