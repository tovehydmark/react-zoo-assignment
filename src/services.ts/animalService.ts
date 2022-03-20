import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";

export function animalService() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    axios
      .get<IAnimal[]>(`https://animals.azurewebsites.net/api/animals`)
      .then((response) => {
        console.log(response.data);
        setAnimals(response.data);
      });
  }, []);
}
