import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useFetchMosqueDetail = (id: string) => {
  return useQuery({
    queryKey: ["mosque-detail", id],
    queryFn: async (): Promise<GeneralResponse<Mosque>> => {
      try {
        const resp = await axios({
          method: "get",
          url: `https://api.masjed.id/api/v2/mosques/${id}`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!id,
  });
};

export const useFetchMosqueActivities = (id: string, page: number) => {
  return useQuery({
    queryKey: ["mosque-activities", id, page],
    queryFn: async (): Promise<GeneralResponse<Activity[]> & PageInfo> => {
      try {
        const resp = await axios({
          method: "get",
          url: `https://api.masjed.id/api/v2/activities`,
          params: {
            page,
            limit: 7,
            mosqueId: id,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!id,
  });
};

export const useFetchMosqueFunds = (id: string, page: number) => {
  return useQuery({
    queryKey: ["mosque-funds", id, page],
    queryFn: async (): Promise<GeneralResponse<Activity[]> & PageInfo> => {
      try {
        const resp = await axios({
          method: "get",
          url: `https://api.masjed.id/api/v2/funds`,
          params: {
            page,
            limit: 7,
            mosqueId: id,
          },
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!id,
  });
};

export const useFetchMosqueChart = (id: string) => {
  return useQuery({
    queryKey: ["mosque-chart", id],
    queryFn: async (): Promise<GeneralResponse<Chart[]>> => {
      try {
        const resp = await axios({
          method: "get",
          url: `https://api.masjed.id/api/v2/transactions/mosques/${id}/chart`,
        });
        return resp.data;
      } catch (error: any) {
        throw new Error(error.response.data.message || error.message, {
          cause: error,
        });
      }
    },
    enabled: !!id,
  });
};

export const usePaymentMethods = () => {
  return useMutation({
    mutationKey: ["fetch-payment-methods"],
    mutationFn: (amount: number) =>
      axios({
        method: "post",
        url: `https://api.eziswaf.net/v1/pay/methods`,
        data: {
          amount,
        },
      }).catch((error: any) => {
        throw new Error(error.response?.data?.message || error.message, {
          cause: error,
        });
      }),
  });
};

export const usePayment = () => {
  return useMutation({
    mutationKey: ["make-payment"],
    mutationFn: (payload: IDonationPayload) =>
      axios({
        method: "post",
        url: `https://api.eziswaf.net/v1/pay/inquiry`,
        data: payload,
      }).catch((error: any) => {
        throw new Error(error.response?.data?.message || error.message, {
          cause: error,
        });
      }),
  });
};
