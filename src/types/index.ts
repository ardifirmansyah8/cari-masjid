interface GeneralResponse<T> {
  data: T;
}

interface PageInfo {
  pageInfo: {
    offset: number;
    pageSize: number;
    next: boolean;
    count: 1;
  };
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
  totalBalance: number | null;
}

interface Activity {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  content: string;
  category: {
    id: number;
    title: string;
    name: string;
  };
  mosque: {
    id: string;
    name: string;
  };
}

interface Chart {
  zakat: number;
  infaq: number;
  wakaf: number;
  month: "string";
}

interface IPaymentFee {
  paymentImage: string;
  paymentMethod: string;
  paymentName: string;
  totalFee: string;
  type: "va" | "qris" | "retail" | "ewallet" | "other";
}

interface IPaymentMethod {
  type: string;
  method: IPaymentFee[];
}

interface IDonationPayload {
  paymentAmount: number;
  paymentMethod: string;
  productDetails: string;
  customerVaName: string;
  email: string;
  phoneNumber: string;
  itemDetails: {
    name: string;
    price: number;
    quantity: number;
  }[];
  customerDetail: {
    firstName: string;
    lastName: string | null;
    email: string | null;
    phoneNumber: string;
  };
  callbackUrl: string;
  expiryPeriod: number;
}
