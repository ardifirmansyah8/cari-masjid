"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/Spinner";
import { useFetchMosqueActivities } from "@/hooks";

export default function ActivityContent({
  selectedMosque,
}: {
  selectedMosque: string;
}) {
  const observer = useRef<IntersectionObserver>();

  const [page, setPage] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);

  const { data, isLoading, isFetching } = useFetchMosqueActivities(
    selectedMosque,
    page
  );
  const mosqueActivities = data?.data;

  useEffect(() => {
    if (mosqueActivities) {
      setActivities([...activities, ...data.data]);
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
      {activities.length === 0 && (
        <div className="w-full flex justify-center p-10">
          <Label className="text-center">Tidak ada kegiatan</Label>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {activities &&
          activities.length > 0 &&
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-2.5 p-2.5 border border-grey-1 rounded"
              ref={lastElRef}
            >
              <Image
                src={activity.imageUrl || "/dummy-image.png"}
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
                <Link
                  href={"/activity/" + activity.id}
                  className="line-clamp-2 hover:text-blue-1"
                >
                  {activity.name}
                </Link>
                <Label className="text-xs text-green-1">
                  #{activity.category.name}
                </Label>
              </div>
            </div>
          ))}
        {isFetching && <Spinner />}
      </div>
    </ScrollArea>
  );
}
