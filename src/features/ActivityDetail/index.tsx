"use client";

import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchActivityDetail } from "@/hooks";

setDefaultOptions({ locale: id });

export default function ActivityDetail() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useFetchActivityDetail(id);
  const detail = data?.data;

  return (
    <section className="md:mb-8 flex md:justify-center">
      <div className="md:w-[1024px] flex flex-col gap-4 md:gap-7">
        <Image
          src={"/icon/icon-arrow-single-left.svg"}
          width={36}
          height={36}
          alt="icon-arrow-left"
          className="cursor-pointer"
          onClick={() => window.location.replace("/")}
        />
        <div className="flex flex-col gap-5 md:gap-7">
          <div className="flex flex-col gap-2.5 md:gap-4">
            {isLoading && <Skeleton className="w-full h-10" />}
            {!isLoading && (
              <Label className="text-xl md:text-4xl font-bold">
                {detail?.name}
              </Label>
            )}
            {isLoading && <Skeleton className="w-1/2 h-6" />}
            {!isLoading && (
              <Label className="md:text-xl text-green-1">
                #{detail?.category?.name}
              </Label>
            )}
            {isLoading && <Skeleton className="w-full h-10" />}
            {!isLoading && (
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2.5">
                <Label className="md:text-xl">
                  Kegiatan {detail?.mosque.name}
                </Label>
              </div>
            )}
          </div>
          {isLoading && (
            <Skeleton className="w-full h-[173px] md:h-[443px] md:rounded-2xl " />
          )}
          {!isLoading && (
            <Image
              src={detail?.imageUrl || ""}
              alt="banner-program"
              width="0"
              height="0"
              sizes="100%"
              className="w-full h-[173px] md:h-[443px] md:rounded-2xl md:mb-2 object-contain"
            />
          )}
          <Label className="text-xl md:text-2xl font-semibold">
            Informasi Kegiatan
          </Label>
          <Label
            className="md:text-base text-grey-2 leading-6 md:leading-7"
            dangerouslySetInnerHTML={{ __html: detail?.content || "" }}
          />
        </div>
      </div>
    </section>
  );
}
