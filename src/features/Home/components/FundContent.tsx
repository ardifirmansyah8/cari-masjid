"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/Spinner";
import { useFetchMosqueFunds } from "@/hooks";
import DonationDialog from "@/components/DonationDialog";

export default function FundContent({
  selectedMosque,
}: {
  selectedMosque: string;
}) {
  const observer = useRef<IntersectionObserver>();

  const [page, setPage] = useState(0);
  const [funds, setFunds] = useState<Activity[]>([]);
  const [dialog, setDialog] = useState("");
  const [fundId, setFundId] = useState("");

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
    <>
      <ScrollArea className="md:h-[400px] w-full my-4 pr-3">
        {funds.length === 0 && (
          <div className="w-full flex justify-center p-10">
            <Label className="text-center">Tidak ada pendanaan</Label>
          </div>
        )}
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
                <div className="flex flex-1 flex-col gap-1">
                  <Link
                    href={"/fund/" + fund.id}
                    className="line-clamp-2 hover:text-blue-1"
                  >
                    {fund.name}
                  </Link>
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-red-1">
                      #{fund.category.name}
                    </Label>
                    <Button
                      size="sm"
                      className="text-[10px] leading-0"
                      onClick={() => {
                        setFundId(fund.id);
                        setDialog("payment-method");
                      }}
                    >
                      Tunaikan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          {isFetching && <Spinner />}
        </div>
      </ScrollArea>

      <DonationDialog
        open={dialog === "payment-method"}
        onClose={() => setDialog("")}
        id={selectedMosque}
      />
    </>
  );
}
