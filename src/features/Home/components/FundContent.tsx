"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/Spinner";
import { useFetchMosqueFunds } from "@/hooks";

export default function FundContent({
  selectedMosque,
}: {
  selectedMosque: string;
}) {
  const observer = useRef<IntersectionObserver>();

  const [page, setPage] = useState(0);
  const [funds, setFunds] = useState<Activity[]>([]);

  const { data, isLoading, isFetching } = useFetchMosqueFunds(
    selectedMosque,
    page
  );
  const mosqueActivities = data?.data;

  useEffect(() => {
    if (mosqueActivities) {
      setFunds([...funds, ...data.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mosqueActivities]);

  const lastElRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.pageInfo.next && !isFetching) {
          setPage(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, data, isFetching, page]
  );

  return (
    <ScrollArea className="h-[400px] w-full my-4 pr-3">
      <div className="flex flex-col gap-1">
        {funds &&
          funds.length > 0 &&
          funds.map((fund) => (
            <div
              key={fund.id}
              className="flex gap-2.5 p-2.5 border border-grey-1 rounded"
              ref={lastElRef}
            >
              <Image
                src={fund.imageUrl || "/dummy-image.png"}
                alt="image-fund"
                width={80}
                height={50}
                className="rounded object-cover"
                loader={({ src }) => src}
                onError={(e: any) => {
                  e.target.srcset = "/dummy-image.png";
                }}
              />
              <div className="flex flex-col gap-1">
                <Label className="line-clamp-2">{fund.name}</Label>
                <Label className="text-xs text-green-1">
                  #{fund.category.name}
                </Label>
              </div>
            </div>
          ))}
        {isFetching && <Spinner />}
      </div>
    </ScrollArea>
  );
}
