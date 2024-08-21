"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";

import { Label } from "@/components/ui/label";
import WrapperArrow from "@/components/WrapperArrow";
import { delimiter } from "@/utils/string";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NearestMosque() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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

  return (
    <div className="min-w-0 max-width-[1024px] flex flex-col gap-4">
      <Label className="text-base font-semibold">Masjid Terdekat</Label>
      <Slider {...settings}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border border-grey-1 flex flex-col rounded-[10px]"
          >
            <Image
              src="/masjid-dummy.png"
              alt="masjid"
              width={280}
              height={150}
              className="w-full rounded-tl-[10px] rounded-tr-[10px]"
            />
            <div className="p-5 flex flex-col gap-4 rounded-bl-[10px] rounded-br-[10px]">
              <div className="flex flex-col gap-1">
                <Label className="font-semibold">Masjid Assalam</Label>
                <Label className="text-xs font-normal">100m</Label>
              </div>
              <div className="flex gap-2.5 items-start">
                <Image
                  src="/icon/icon-pin-light.svg"
                  alt="icon-pin-light"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />

                <Label className="text-xs font-normal">
                  Jl. Bukit Pamulang Indah No.A18, RW.8, Pamulang Tim., Kec.
                  Pamulang, Kota Tangerang Selatan, Banten 15417
                </Label>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
