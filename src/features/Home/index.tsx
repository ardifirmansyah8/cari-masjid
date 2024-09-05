"use client";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import Autocomplete from "./components/Autocomplete";
import Crosshairs from "./components/Crosshairs";
import MapHandler from "./components/MapHandler";
import NearestMosque from "./components/NearestMosque";
import { useFetchFindNearestMosques } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [coordinate, setCoordinate] = useState({
    lat: -6.175392,
    lng: 106.827153,
  });

  const { data } = useFetchFindNearestMosques(coordinate);
  const nearestMosques = data?.data;

  const geolocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoordinate({
          lat: lat,
          lng: lng,
        });
      }
    );
  };

  useEffect(() => {
    geolocate();
  }, []);

  return (
    <>
      <Label className="text-base md:text-xl">
        Lokasi masjid di sekitar Anda
      </Label>
      <div className="flex gap-4 mt-4 mb-6">
        <div className="relative flex-1 h-[330px] md:h-[605px]">
          <APIProvider apiKey={"AIzaSyDd-Xv_wBoM5_oaEwAuDpIy_nTRCkKX2EI"}>
            <Map
              mapId="masjed-map"
              defaultZoom={17}
              defaultCenter={coordinate}
              mapTypeControl={false}
              scaleControl={false}
              streetViewControl={false}
              rotateControl={false}
              fullscreenControl={false}
            >
              {nearestMosques?.map((mosque) => {
                const latlng = new google.maps.LatLng({
                  lat: parseFloat(mosque.latitude),
                  lng: parseFloat(mosque.longitude),
                });
                return (
                  <AdvancedMarker
                    key={mosque.id}
                    position={latlng}
                    onClick={() => alert("test")}
                  >
                    <Image
                      src="https://api.masjed.id/assets/icons/menus/registered.png"
                      width={24}
                      height={24}
                      alt="marker"
                    />
                  </AdvancedMarker>
                );
              })}
            </Map>
            <Autocomplete onPlaceSelect={setCoordinate} />
            <Crosshairs onClick={geolocate} />
            <MapHandler coordinate={coordinate} />
          </APIProvider>
        </div>
        <div className="w-[412px] rounded-[10px] border border-grey-1 p-4 flex flex-col">
          <Tabs defaultValue="info" className="w-full flex-1">
            <TabsList>
              <TabsTrigger value="info">Informasi</TabsTrigger>
              <TabsTrigger value="activities">Kegiatan</TabsTrigger>
              <TabsTrigger value="funds">Pendanaan</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="py-4 flex flex-col gap-4">
                <Image
                  src={"/masjid-dummy.png"}
                  alt="masjid-detail"
                  width={382}
                  height={220}
                  className="w-full rounded"
                />

                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <Label className="text-xl font-bold">
                      Masjid Al-Ikhlas
                    </Label>
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/Current+Location/${coordinate.lat},${coordinate.lng}`
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
                      Jl. Bukit Pamulang Indah No.A18, RW.8, Pamulang Tim., Kec.
                      Pamulang, Kota Tangerang Selatan, Banten 15417
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
                        Saldo Kotak Amal
                      </Label>
                      <Label className="text-xl font-semibold text-green-1">
                        Rp 1.000.000.000
                      </Label>
                    </div>
                  </div>

                  <Label className="text-blue-1 underline text-xs cursor-pointer">
                    Detail
                  </Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="activities" className="flex flex-col gap-1">
              <div className="py-4">
                <div className="flex gap-2.5 p-2.5 border border-grey-1 rounded">
                  <Image
                    src={"/dummy-image.png"}
                    alt="image-activity"
                    width={80}
                    height={50}
                    className="rounded object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <Label>Bantu 1 Anak Jalanan Bisa Belajar</Label>
                    <Label className="text-xs text-green-1">#Pendidikan</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="funds" className="flex flex-col gap-1">
              <div className="py-4">
                <div className="flex gap-2.5 p-2.5 border border-grey-1 rounded">
                  <Image
                    src={"/dummy-image.png"}
                    alt="image-activity"
                    width={80}
                    height={50}
                    className="rounded object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <Label>Bantu 1 Anak Jalanan Bisa Belajar</Label>
                    <Label className="text-xs text-green-1">#Pendidikan</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <div className="bg-blue-2 p-2.5 rounded">
              <Label className="text-[10px] leading-4">
                *INFAQ yang anda berikan ke masjid ini akan disalurkan melalui{" "}
                <span className="font-bold text-blue-1">
                  Yayasan Dompet Yatim dan Mesjid
                </span>
              </Label>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-4">
              <Button>Infaq</Button>
              <Button>Zakat</Button>
              <Button>Wakaf</Button>
            </div>
          </div>
        </div>
      </div>

      <NearestMosque coordinate={coordinate} />
    </>
  );
}
