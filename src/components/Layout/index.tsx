"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="bg-white w-full flex flex-col items-center">
      {/* <header
        className="w-full flex py-2.5 md:py-4 px-4 md:px-10"
        style={{ boxShadow: "0 4px 2px -2px #0000000D" }}
      >
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo-masjed.svg"}
              width={117}
              height={40}
              alt="logo-masjed"
              className="md:w-[146px] md:h-[50px]"
            />
          </Link>
        </div>
      </header> */}

      <main className="w-full py-6 md:py-8 px-4 md:px-10">
        <section className="flex flex-col w-full">{children}</section>
      </main>
    </div>
  );
}
