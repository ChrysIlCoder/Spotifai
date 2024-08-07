export interface IRequestToken {
  client_id: string;
  client_secret: string;
}

export interface IGetToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}