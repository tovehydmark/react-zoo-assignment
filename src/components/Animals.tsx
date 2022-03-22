import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "./Animal";
import { getAnimalService } from "../services/getAnimalService";

export function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";
    if (animalsInLs == "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);
      });
    }
  }, []);

  localStorage.setItem("animalList", JSON.stringify(animals));

  let animalsList = animals.map((animal: IAnimal) => {
    return <Animal key={animal.id} animal={animal}></Animal>;
  });

  return <>{animalsList}</>;
}
