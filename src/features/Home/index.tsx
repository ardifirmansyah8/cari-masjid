"use client";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import Autocomplete from "./components/Autocomplete";
import Crosshairs from "./components/Crosshairs";
import DetailMosque from "./components/DetailMosque";
import MapHandler from "./components/MapHandler";
import NearestMosque from "./components/NearestMosque";
import { useFetchFindNearestMosques } from "@/hooks";
import clsx from "clsx";

export default function Home() {
  const searchParam = useSearchParams();
  const latitude = searchParam.get("lat");
  const longitude = searchParam.get("lng");

  const [coordinate, setCoordinate] = useState({
    lat: 0,
    lng: 0,
  });
  const [selectedMosque, setSelectedMosque] = useState("");

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
      },
      () =>
        setCoordinate({
          lat: -6.175392,
          lng: 106.827153,
        })
    );
  };

  useEffect(() => {
    if (latitude && longitude) {
      setCoordinate({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    } else {
      geolocate();
    }
  }, [latitude, longitude]);

  return (
    <>
      {selectedMosque === "" && (
        <Label className="text-base md:text-xl">
          Lokasi masjid di sekitar Anda
        </Label>
      )}
      <div
        className={clsx(
          "flex flex-col md:flex-row items-center gap-4 mb-6",
          selectedMosque === "" && "mt-4"
        )}
      >
        {selectedMosque === "" && (
          <div className="relative w-full md:flex-1 h-[550px] md:h-[650px]">
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
                      onClick={() => setSelectedMosque(mosque.id)}
                    >
                      <Image
                        src="/masjid-registered.png"
                        width={30}
                        height={30}
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
        )}
        <DetailMosque
          selectedMosque={selectedMosque}
          onReset={() => setSelectedMosque("")}
        />
      </div>

      <NearestMosque
        coordinate={coordinate}
        onClickMosque={(id: string) => setSelectedMosque(id)}
        onChangeCoordinate={(coordinate: { lat: number; lng: number }) =>
          setCoordinate(coordinate)
        }
      />

      <div className="mt-6 relative border border-red-1 text-center pb-6">
        <Label className="font-bold text-xs bg-white -top-3 relative px-4">
          E-ZISWAF di Masjid Pilihan Anda
        </Label>
        <div className="w-full flex flex-col items-center px-4">
          <Label className="text-[10px] md:text-sm text-justify">
            Setiap donasi yang Anda salurkan, baik zakat, infaq, shadaqah,
            maupun wakaf, akan membawa keberkahan tidak hanya bagi penerima
            manfaat tetapi juga bagi Anda sebagai muzzaki. Dengan ikut
            berpartisipasi dalam program E-ZISWAF, Anda membantu memperkuat
            fungsi sosial, keagamaan dan kemakmuran masjid serta memberikan
            dampak positif bagi masyarakat sekitar
          </Label>
          <div className="grid grid-cols-5 mt-3">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/zakat.png"}
                alt="footer-zakat"
                width={38}
                height={38}
              />
              <Label className="text-[10px] md:text-sm">Zakat</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/infaq.png"}
                alt="footer-infaq"
                width={38}
                height={38}
              />
              <Label className="text-[10px] md:text-sm">Infaq</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/sedekah.png"}
                alt="footer-sedekah"
                width={38}
                height={38}
              />
              <Label className="text-[10px] md:text-sm">Sedekah</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/wakaf.png"}
                alt="footer-wakaf"
                width={38}
                height={38}
              />
              <Label className="text-[10px] md:text-sm">Wakaf</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/jumat-berkah.png"}
                alt="footer-jumat-berkah"
                width={38}
                height={38}
              />
              <Label className="text-[10px] md:text-sm">
                {"Jum'at Berkah"}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
