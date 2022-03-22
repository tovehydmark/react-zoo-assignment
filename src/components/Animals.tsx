import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "./Animal";
import { getAnimalService } from "../services/getAnimalService";
import { Link } from "react-router-dom";

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
    let animalLink = `/animal-info/${animal.id}`;
    return (
      <div key={animal.latinName}>
        <Animal animal={animal}></Animal>
        <button key={animal.id}>
          <Link to={animalLink}>{animal.name}</Link>
        </button>
      </div>
    );
  });

  return <>{animalsList}</>;
}
