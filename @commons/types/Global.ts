interface ITokenInfos {
  token: string;
  refreshToken: string;
  accessToken: string;
  createdAt: number;
  expireAt: number;
}

export class Global {
  static tokens: ITokenInfos;
}
