"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

import { Label } from "@/components/ui/label";
import WrapperArrow from "@/components/WrapperArrow";
import { useFetchFindNearestMosques } from "@/hooks";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SyntheticEvent } from "react";

interface Props {
  coordinate: { lat: number; lng: number };
  onClickMosque: (id: string) => void;
  onChangeCoordinate: (coordinate: { lat: number; lng: number }) => void;
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
  prevArrow: (
    <WrapperArrow>
      <Image
        src={"/icon/icon-arrow-left.svg"}
        alt={"icon-arrow-left"}
        width={40}
        height={40}
      />
    </WrapperArrow>
  ),
  nextArrow: (
    <WrapperArrow>
      <Image
        src={"/icon/icon-arrow-right.svg"}
        alt={"icon-arrow-right"}
        width={40}
        height={40}
      />
    </WrapperArrow>
  ),
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export default function NearestMosque({
  coordinate,
  onClickMosque,
  onChangeCoordinate,
}: Props) {
  const router = useRouter();

  const { data, isFetching } = useFetchFindNearestMosques(
    coordinate,
    10,
    "nearest-mosque"
  );
  const nearestMosques = data?.data ?? [];

  return (
    <div className="min-w-0 flex flex-col gap-4">
      <Label className="text-base font-semibold">Masjid Terdekat</Label>
      {!isFetching && nearestMosques.length === 0 && (
        <div className="w-full p-10 flex justify-center items-center">
          Tidak ada data
        </div>
      )}
      {!isFetching && nearestMosques.length > 0 && (
        <Slider {...settings}>
          {nearestMosques.map((mosque, i) => (
            <div
              key={i}
              className="border border-grey-1 flex flex-col rounded-[10px]"
            >
              <Image
                src={mosque.imageUrl || "/mosque-placeholder.png"}
                alt="masjid"
                width={280}
                height={150}
                className="w-full rounded-tl-[10px] rounded-tr-[10px]"
                loader={({ src }) => src}
                onError={(e: any) => {
                  e.target.srcset = "/mosque-placeholder.png";
                }}
              />
              <div className="p-5 h-[150px] flex flex-col gap-4 rounded-bl-[10px] rounded-br-[10px]">
                <div className="flex flex-col gap-1">
                  <Label
                    className="font-semibold cursor-pointer hover:text-blue-1 line-clamp-2"
                    onClick={() => {
                      onClickMosque(mosque.id);
                      onChangeCoordinate({
                        lat: parseFloat(mosque.latitude),
                        lng: parseFloat(mosque.longitude),
                      });
                    }}
                  >
                    {mosque.name}
                  </Label>
                  <Label className="text-xs font-normal">
                    {Math.ceil(mosque.distanceInMeters)}m
                  </Label>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Image
                    src="/icon/icon-pin-light.svg"
                    alt="icon-pin-light"
                    width={20}
                    height={20}
                    className="w-6 h-6"
                  />

                  <Label className="text-xs font-normal line-clamp-3">
                    {mosque.address}
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
