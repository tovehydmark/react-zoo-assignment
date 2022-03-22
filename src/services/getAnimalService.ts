import axios from "axios";
import { IAnimal } from "../models/IAnimal";

export function getAnimalService() {
  return axios.get<IAnimal[]>(`https://animals.azurewebsites.net/api/animals`);
}
