interface ITokenInfos {
  token: string;
  refreshToken: string;
  createdAt: number;
  expireAt: number;
}

export class Global {
  static tokens: ITokenInfos;
}
