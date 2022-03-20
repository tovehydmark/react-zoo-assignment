import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "./Animal";

export function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    axios
      .get<IAnimal[]>(`https://animals.azurewebsites.net/api/animals`)
      .then((response) => {
        setAnimals(response.data);
      });
  }, []);

  let animalsList = animals.map((animal: IAnimal) => {
    return <Animal key={animal.id} animal={animal}></Animal>;
  });

  return <>{animalsList}</>;
}
