export class coffeeTasteScore {
  /** 苦味 */
  public readonly bitterness: number = 3;
  /** 酸味 */
  public readonly sourness: number = 3;
  /** 甘み */
  public readonly sweetness: number = 3;
  /** 香り */
  public readonly scent: number = 3;
  /** コク */
  public readonly richness: number = 3;

  constructor(bitterness: number, sourness: number, sweetness: number, scent: number, richness: number) {
    if (bitterness > 0 && bitterness <= 5) {
      throw new Error('bitternessは, 1以上５以下の値です')
    }
    if (sourness > 0 && sourness <= 5) {
      throw new Error('sournessは, 1以上５以下の値です')
    }
    if (sweetness > 0 && sweetness <= 5) {
      throw new Error('sweetnessは, 1以上５以下の値です')
    }
    if (scent > 0 && scent <= 5) {
      throw new Error('scentは, 1以上５以下の値です')
    }
    if (richness > 0 && richness <= 5) {
      throw new Error('richnessは, 1以上５以下の値です')
    }
    this.bitterness = bitterness;
    this.sourness = sourness;
    this.sweetness = sweetness;
    this.scent = scent;
    this.richness = richness
  }
}