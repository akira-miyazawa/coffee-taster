export class coffeeTasteScore {
  /** 苦味 */
  private _bitterness: number = 3;
  /** 酸味 */
  private _sourness: number = 3;
  /** 甘み */
  private _sweetness: number = 3;
  /** 香り */
  private _scent: number = 3;
  /** コク */
  private _richness: number = 3;

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
    this._bitterness = bitterness;
    this._sourness = sourness;
    this._sweetness = sweetness;
    this._scent = scent;
    this._richness = richness
  }

  get bitterness(): number {
    return this._bitterness;
  }

  get sourness(): number {
    return this._sourness;
  }

  get sweetness(): number {
    return this._sweetness;
  }

  get scent(): number {
    return this._scent;
  }

  get richness(): number {
    return this._richness;
  }
}