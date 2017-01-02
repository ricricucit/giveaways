export interface User {
  readonly id?: number;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly password?: string;
  readonly image: string;         //avatar
  readonly options?: Object;       //user options (lang, timezone, etc.)
  readonly ts: number;            //timestamp
}
