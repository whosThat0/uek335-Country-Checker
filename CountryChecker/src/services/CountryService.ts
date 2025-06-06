import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Country {
  name: string;
  id: string;
  flag: string;
}

export const getCountries = async (): Promise<Country[]> => {
  const response = await api.get<Country[]>("/countries");
  return response.data;
};

export const getCountryById = async (id: string): Promise<Country> => {
  const response = await api.get<Country>(`/countries/${id}`);
  return response.data;
};

function CountryService() {
  return {
    getCountries,
    getCountryById,
  };
}   

export default CountryService;