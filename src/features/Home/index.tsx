"use client";

import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import Autocomplete from "./components/Autocomplete";
import Crosshairs from "./components/Crosshairs";
import MapHandler from "./components/MapHandler";
import NearestMosque from "./components/NearestMosque";

export default function Home() {
  const [coordinate, setCoordinate] = useState({
    lat: -6.175392,
    lng: 106.827153,
  });

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
      <div className="relative w-full h-[330px] md:h-[600px] mt-4 mb-6">
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
            <AdvancedMarker position={coordinate}>
              <Image
                src="https://api.masjed.id/assets/icons/menus/registered.png"
                width={24}
                height={24}
                alt="marker"
              />
            </AdvancedMarker>
          </Map>
          <Autocomplete onPlaceSelect={setCoordinate} />
          <Crosshairs onClick={geolocate} />
          <MapHandler coordinate={coordinate} />
        </APIProvider>
      </div>

      <NearestMosque />
    </>
  );
}
