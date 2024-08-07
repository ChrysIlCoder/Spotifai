import { fetcher } from '../../../hooks/fetcher'

export const GetSeveralCategories = async (
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
