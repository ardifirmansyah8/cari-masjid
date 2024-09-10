import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

interface Props {
  coordinate: { lat: number; lng: number };
}

const MapHandler = ({ coordinate }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (coordinate.lat && coordinate.lng) {
      map.setCenter(coordinate);
    }
  }, [map, coordinate]);

  return null;
};

export default React.memo(MapHandler);
