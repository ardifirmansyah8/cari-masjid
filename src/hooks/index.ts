import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ParamsNearest {
  coordinate: { lat: number; lng: number };
  limit?: number;
  key?: string;
}

export const useFetchFindNearestMosques = (
  { lat, lng }: ParamsNearest["coordinate"],
  limit?: ParamsNearest["limit"],
  key = "finding-nearest"
) => {
  return useQuery({
    queryKey: [key, lat, lng],
    queryFn: async (): Promise<GeneralResponse<Mosque[]>> => {
      try {
        const resp = await axios({
          method: "get",
          url: `https://api.masjed.id/api/v2/mosques`,
          params: {
            latitude: lat,
            longitude: lng,
            limit,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
  });
};
