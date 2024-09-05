interface GeneralResponse<T> {
  data: T;
}

interface Mosque {
  id: string;
  imageUrl: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  distanceInMeters: number;
  isClaimed: boolean;
}
