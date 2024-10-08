"use client";

import clsx from "clsx";
import { Share, Share2, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";

import { useFetchMosqueChart, useFetchMosqueDetail } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationDialog from "@/components/DonationDialog";
import { delimiter } from "@/utils/string";
import ActivityContent from "./ActivityContent";
import FundContent from "./FundContent";
import ShareDialog from "./ShareDialog";

import "chart.js/auto";

const Chart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

export default function DetailMosque({
  selectedMosque,
  onReset,
}: {
  selectedMosque: string;
  onReset: () => void;
}) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [dialog, setDialog] = useState("");

  const { data: mosqueDetail } = useFetchMosqueDetail(selectedMosque);
  const mosque = mosqueDetail?.data;

  const { data: mosqueChart } = useFetchMosqueChart(selectedMosque);
  const chart = mosqueChart?.data;

  const chartData = useMemo(() => {
    const data = {
      total: [] as number[],
      zakat: [] as number[],
      infaq: [] as number[],
      wakaf: [] as number[],
      month: [] as string[],
    };
    if (chart && chart.length > 0) {
      chart.forEach((item) => {
        data.total.push(item.zakat + item.infaq + item.wakaf);
        data.month.push(item.month);
        data.zakat.push(item.zakat);
        data.wakaf.push(item.wakaf);
        data.infaq.push(item.infaq);
      });
    }
    return {
      labels: data.month,
      datasets: [
        {
          label: "Semua",
          data: data.total,
          fill: false,
          backgroundColor: "#45AF63",
          borderColor: "#45AF63",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Zakat",
          data: data.zakat,
          fill: false,
          backgroundColor: "#4169E1",
          borderColor: "#4169E1",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Infaq",
          data: data.infaq,
          fill: false,
          backgroundColor: "#FF4F79",
          borderColor: "#FF4F79",
          borderRadius: "50%",
          tension: 0.1,
        },
        {
          label: "Wakaf",
          data: data.wakaf,
          fill: false,
          backgroundColor: "#FFBE0A",
          borderColor: "#FFBE0A",
          tension: 0.1,
        },
      ],
    };
  }, [chart]);

  return (
    <>
      <div
        className={clsx({
          "rounded-[10px] h-[620px] md:border border-grey-1 p-4 transition-all duration-1000":
            true,
          "w-[412px]": selectedMosque,
          "w-0 hidden": !selectedMosque,
        })}
      >
        {!isShowDetail ? (
          <div className="w-full h-full flex flex-col">
            <Tabs defaultValue="info" className="w-full flex-1">
              <TabsList>
                <TabsTrigger value="info">Informasi</TabsTrigger>
                <TabsTrigger value="activities">Kegiatan</TabsTrigger>
                <TabsTrigger value="funds">Pendanaan</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="py-4 flex flex-col gap-4">
                  <Image
                    src={mosque?.imageUrl || "/mosque-placeholder.png"}
                    alt="masjid-detail"
                    width={382}
                    height={210}
                    className="w-full rounded"
                    loader={({ src }) => src}
                    onError={(e: any) => {
                      e.target.srcset = "/mosque-placeholder.png";
                    }}
                  />

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center gap-2">
                      <Label className="text-base md:text-xl font-bold line-clamp-2 text-red-1">
                        {mosque?.name}
                      </Label>
                      <Button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/Current+Location/${mosque?.latitude},${mosque?.longitude}`
                          )
                        }
                      >
                        Pergi ke Masjid
                      </Button>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Image
                        src="/icon/icon-pin-light.svg"
                        alt="icon-pin-light"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />

                      <Label className="text-xs font-normal line-clamp-2">
                        {mosque?.address}
                      </Label>
                    </div>
                  </div>

                  <div className="bg-grey-6 px-4 py-2.5 flex justify-between items-center rounded">
                    <div className="flex items-center gap-2.5">
                      <Image
                        src="/icon/icon-box-light.svg"
                        alt="icon-box-light"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs font-semibold">
                          Saldo Kotak Amal Digital
                        </Label>
                        <Label className="text-base md:text-xl font-semibold text-red-1">
                          Rp {delimiter(mosque?.totalBalance || 0)}
                        </Label>
                      </div>
                    </div>

                    <Label
                      className="text-blue-1 underline text-xs cursor-pointer"
                      onClick={() => setIsShowDetail(true)}
                    >
                      Detail
                    </Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activities">
                <ActivityContent selectedMosque={selectedMosque} />
              </TabsContent>
              <TabsContent value="funds">
                <FundContent selectedMosque={selectedMosque} />
              </TabsContent>
            </Tabs>

            <div>
              <div className="flex justify-between py-2 px-4">
                <Label className="text-[9px] leading-4">
                  *INFAQ masjid ini akan disalurkan melalui Lembaga Amil Zakat:{" "}
                  <span className="font-bold text-red-1 text-xs">
                    <br />
                    Yayasan Dompet Yatim dan Mesjid
                  </span>
                  <span className="font-bold">
                    <br />
                    SK Menteri Agama RI Nomor 027/F/Tahun 2022
                  </span>
                </Label>
                <Image
                  src="/icon/icon-laz.svg"
                  alt="icon-laz"
                  width={50}
                  height={50}
                />
              </div>

              <div className="mt-2.5 flex gap-4">
                <Button
                  className="flex-1"
                  onClick={() => setDialog("payment-method")}
                >
                  Donasi Masjid
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => setDialog("share-dialog")}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant={"outline"} onClick={() => onReset()}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="flex items-start gap-4">
              <Image
                src={"/icon/icon-arrow-single-left.svg"}
                width={24}
                height={24}
                alt="icon-arrow-left"
                className="cursor-pointer"
                onClick={() => setIsShowDetail(false)}
              />
              <div className="flex flex-col gap-1">
                <Label className="text-base font-semibold">
                  Data Saldo Kotak Amal
                </Label>
                <Label className="text-xl font-bold text-green-1">
                  {mosque?.name}
                </Label>
              </div>
            </div>
            <div className="bg-grey-6 px-4 py-2.5 flex gap-2.5 items-center rounded mt-5 mb-4">
              <Image
                src="/icon/icon-box-light.svg"
                alt="icon-box-light"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="flex flex-col gap-1">
                <Label className="text-xs font-semibold">
                  Saldo Kotak Amal
                </Label>
                <Label className="text-xl font-semibold text-green-1">
                  Rp {delimiter(mosque?.totalBalance || 0)}
                </Label>
              </div>
            </div>
            <Label className="text-xs">
              Data dari seluruh infaq yang masuk ke saldo kotak amal dari masjid
              hingga saat ini.
            </Label>
            <Label className="my-4 font-semibold">
              Grafik total donasi tahun 2024
            </Label>

            <div className="w-full h-[250px]">
              <Chart
                type="line"
                data={chartData}
                width="100%"
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      align: "end",
                      labels: {
                        usePointStyle: true,
                        boxHeight: 5,
                      },
                      onClick: (_, legendItem, legend) => {
                        const datasetIndex = legendItem.datasetIndex as number;
                        legend.chart.getDatasetMeta(datasetIndex).hidden =
                          !legendItem.hidden;
                        legend.chart.update();
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>

      {typeof window !== "undefined" && (
        <ShareDialog
          coordinate={{
            lat: mosque?.latitude ?? "",
            lng: mosque?.longitude ?? "",
          }}
          open={dialog === "share-dialog"}
          onClose={() => setDialog("")}
        />
      )}

      <DonationDialog
        open={dialog === "payment-method"}
        onClose={() => setDialog("")}
        id={selectedMosque}
      />
    </>
  );
}
