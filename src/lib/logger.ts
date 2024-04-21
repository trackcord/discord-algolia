import { ansiColors } from "./data";

export default class Logger {
  private constructor() {
    throw new Error("This class cannot be instantiated");
  }

  private static log(message: string, color: string) {
    console.log(
      `${color}[ ${color === ansiColors.blue ? "INFO" : color === ansiColors.yellow ? "WARN" : color === ansiColors.red ? "ERROR" : color === ansiColors.green ? "SUCCESS" : "CUSTOM"} ] ${ansiColors.reset}${message}`,
    );
  }

  public static info(message: string) {
    Logger.log(message, ansiColors.blue);
  }

  public static warn(message: string) {
    Logger.log(message, ansiColors.yellow);
  }

  public static error(message: string) {
    Logger.log(message, ansiColors.red);
  }

  public static success(message: string) {
    Logger.log(message, ansiColors.green);
  }

  public static custom(message: string, color: string) {
    Logger.log(message, color);
  }
}
