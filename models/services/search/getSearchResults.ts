import { fetcher } from '../../../hooks/fetcher'

export const GetSearchResults = async (
  url: string,
  token: string,
): Promise<any> =>
  fetcher({
    method: "get",
    url,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
