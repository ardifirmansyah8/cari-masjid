"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Search } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import Image from "next/image";

type Props = {
  onPlaceSelect: ({ lat, lng }: { lat: number; lng: number }) => void;
};

export default function Autocomplete({ onPlaceSelect }: Props) {
  const map = useMap();
  const places = useMapsLibrary("places");

  const [search, setSearch] = useState("");
  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setSearch(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const onClickSuggestion = useCallback(
    (placeId: string) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        const place = {
          lat: placeDetails?.geometry?.location?.lat() ?? 0,
          lng: placeDetails?.geometry?.location?.lng() ?? 0,
        };
        onPlaceSelect(place);
        setPredictionResults([]);
        setSearch("");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div className="w-full absolute top-0 p-4">
      <div className="relative">
        <Input
          value={search}
          onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
          placeholder="Cari masjid dilokasi sekitar kamu..."
          className="w-full"
          rightIcon={
            <Image
              src="/icon/icon-search.svg"
              alt="icon-search"
              width={24}
              height={24}
              className="absolute right-3 top-2"
            />
          }
        />

        {predictionResults.length > 0 && (
          <ul className="w-full bg-white">
            {predictionResults.map(({ place_id, description }) => {
              return (
                <li
                  key={place_id}
                  className="p-2 hover:bg-grey-4 hover:text-white cursor-pointer"
                  onClick={() => onClickSuggestion(place_id)}
                >
                  {description}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
