import { fetcher } from '../../../hooks/fetcher'
import { IRequestToken } from "../../../src/interfaces/IAuth";
import qs from 'qs'

export const GetToken = async (
  url: string,
  baseUrl: string,
  body: IRequestToken
): Promise<any> =>
  fetcher({
    method: "post",
    baseUrl,
    url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify({
      grant_type: 'client_credentials',
      client_id: body.client_id,
      client_secret: body.client_secret
    })
  });
