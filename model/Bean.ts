import { RoastType } from "@/types/input";

export class Bean {
  /** 焙煎 */
  public readonly roast: RoastType;
  /** 産地 */
  public readonly origin: string;

  constructor(roast: RoastType, origin: string) {
    this.roast = roast == null ? 'NONE' : roast;
    this.origin = origin === '' || origin == null ? '不明' : origin;
  }
}