export interface User {
  readonly access_token?: string;
  readonly appName?: string;
  readonly expires_in?: string;
  readonly userId?: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly regId?: string;
  readonly username: string;
  readonly password?: string;
  readonly image?: string;         //avatar
  readonly options?: Object;       //user options (lang, timezone, etc.)
  readonly ts: number;            //timestamp
}