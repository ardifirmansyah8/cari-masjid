"use client";

import { useRouter } from "next/navigation";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

function makeQueryClient() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toast } = useToast();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if ((error?.cause as any)?.response.status === 401) {
          localStorage.removeItem("jwt");
          window.location.href = "/";
        }

        if (error?.message) {
          toast({
            duration: 1000,
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        } else {
          toast({
            duration: 1000,
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (error?.message) {
          toast({
            duration: 1000,
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        } else {
          toast({
            duration: 1000,
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
