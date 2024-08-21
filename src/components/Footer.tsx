"use client";

import clsx from "clsx";
import Image from "next/image";

import { Label } from "./ui/label";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-grey-1">
      <div className="px-4 py-5 md:py-[30px] flex md:justify-center">
        <div className="md:w-[1280px] flex flex-col md:flex-row md:gap-5">
          <div
            className={clsx({
              "hidden md:block": true,
            })}
          />
          <div
            className={clsx({
              "flex-1 flex flex-col md:flex-row gap-6 md:gap-7 md:justify-between":
                true,
            })}
          >
            <div className="flex flex-col gap-2.5 md:gap-5">
              <Label>Powered by:</Label>
              <div className="flex items-center gap-4">
                <Image
                  src="/footer/icon-artajasa.svg"
                  alt="icon-artajasa"
                  width={36}
                  height={36}
                  className="md:w-[68px] md:h-[68px]"
                />
                <Image
                  src="/footer/icon-masjed.svg"
                  alt="icon-masjed"
                  width={40}
                  height={40}
                  className="md:w-[80px] md:h-[80px]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-5">
              <Label>License:</Label>
              <div className="flex items-center gap-4">
                <Image
                  src="/footer/icon-laz.svg"
                  alt="icon-laz"
                  width={40}
                  height={40}
                  className="md:w-[60px] md:h-[60px]"
                />
                <Label className="text-[10px] md:text-xs">
                  Lembaga Amil Zakat
                  <br />
                  SK Menteri Agama RI
                  <br />
                  Nomor 027/F/Tahun 2022
                </Label>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/footer/icon-ymid.svg"
                  alt="icon-ymid"
                  width={40}
                  height={40}
                  className="md:w-[60px] md:h-[60px]"
                />
                <Label className="text-[10px] md:text-xs">
                  Lembaga Nadzir Wakaf
                  <br />
                  SK BWI Nomor 3.3.300384
                </Label>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-4">
                  <Image
                    src="/footer/icon-kemenkumham.svg"
                    alt="icon-kemenkumham"
                    width={27}
                    height={30}
                    className="md:w-[36px] md:h-[40px]"
                  />
                  <Image
                    src="/footer/icon-kominfo.svg"
                    alt="icon-kominfo"
                    width={27}
                    height={30}
                    className="md:w-[36px] md:h-[40px]"
                  />
                  <Image
                    src="/footer/icon-bnpb.svg"
                    alt="icon-bnpb"
                    width={27}
                    height={30}
                    className="md:w-[36px] md:h-[40px]"
                  />
                </div>
                <Label className="text-[10px] md:text-xs">
                  Nomor TD-PSE: <br className="hidden md:block" />
                  281221002470600000001
                </Label>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col gap-2.5 md:gap-4 mb-2.5 md:mb-7">
                <Label>Hubungi kami:</Label>
                <div className="flex items-center gap-4">
                  <Image
                    src="/footer/icon-phone.svg"
                    alt="icon-phone"
                    width={20}
                    height={20}
                    className="md:w-[25px] md:h-[25px]"
                  />
                  <Label className="text-[10px] md:text-xs">08139999001</Label>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/footer/icon-email.svg"
                    alt="icon-phone"
                    width={20}
                    height={20}
                    className="md:w-[25px] md:h-[25px]"
                  />
                  <Label className="text-[10px] md:text-xs">
                    admin@bersamakami.id
                  </Label>
                </div>
              </div>

              <Label className="text-base md:text-xl">
                <span className="font-bold">
                  Tetap <br className="hidden md:block" />
                  terhubung
                </span>
                <br />
                <span className="font-black">#BersamaKami</span>
              </Label>

              <div className="flex items-center gap-2.5 md:gap-4 mt-2.5 md:mt-4">
                <Image
                  src="/footer/icon-ig.svg"
                  alt="icon-ig"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://www.instagram.com/bersamakami.id/")
                  }
                />
                <Image
                  src="/footer/icon-x.svg"
                  alt="icon-twitter"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://twitter.com/bersamakami_id")
                  }
                />
                <Image
                  src="/footer/icon-fb.svg"
                  alt="icon-fb"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://www.facebook.com/bersamakami.id")
                  }
                />
                <Image
                  src="/footer/icon-youtube.svg"
                  alt="icon-youtube"
                  width={25}
                  height={18}
                  className="cursor-pointer"
                  onClick={() =>
                    window.open("https://www.youtube.com/channel/UC9J")
                  }
                />
                <Image
                  src="/footer/icon-tiktok.svg"
                  alt="icon-tiktok"
                  width={25}
                  height={25}
                  onClick={() => window.open("https://www.tiktok.com")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:justify-center w-full h-[117px] bg-footer-bg-mobile md:bg-footer-bg bg-no-repeat bg-cover px-4 py-5 ">
        <div className="md:w-[1280px] h-full flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-2.5 md:gap-0">
          <Label className="text-xs md:text-lg text-white flex gap-4">
            <span>©</span>
            <span>2024 Masjed Indonesia Digital</span>
          </Label>

          <div className="flex items-center gap-2.5">
            <Link className="text-xs md:text-lg text-white" href={"google.com"}>
              Kebijakan Privasi
            </Link>
            <Label className="text-xs md:text-lg text-white">|</Label>
            <Link className="text-xs md:text-lg text-white" href={"google.com"}>
              Syarat & Ketentuan
            </Link>
            <Label className="text-xs md:text-lg text-white">|</Label>
            <Link className="text-xs md:text-lg text-white" href={"google.com"}>
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
