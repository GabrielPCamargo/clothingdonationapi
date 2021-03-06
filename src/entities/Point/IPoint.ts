export interface IPoint {
  _id?: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  user: {
    name: string;
    email: string;
  };
  type: string;
  number: string;
}
