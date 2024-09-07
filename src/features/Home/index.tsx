"use client";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import Autocomplete from "./components/Autocomplete";
import Crosshairs from "./components/Crosshairs";
import DetailMosque from "./components/DetailMosque";
import MapHandler from "./components/MapHandler";
import NearestMosque from "./components/NearestMosque";
import { useFetchFindNearestMosques } from "@/hooks";

export default function Home() {
  const [coordinate, setCoordinate] = useState({
    lat: -6.175392,
    lng: 106.827153,
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
      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 mb-6">
        <div className="relative w-full md:flex-1 h-[330px] md:h-[625px]">
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
    </>
  );
}
