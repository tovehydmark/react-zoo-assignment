import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { Animal } from "./Animal";
import { getAnimalService } from "../services/getAnimalService";
import { Link } from "react-router-dom";

export function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  //Hämtar data från local storage. Om data inte finns triggas funktionen i service, som då hämtar data
  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";

    setAnimals(JSON.parse(animalsInLs));

    if (animalsInLs === "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);

        localStorage.setItem("animalList", JSON.stringify(response.data));
      });
    }
  }, []);

  //Mappar igenom animalList och ger varje animal en länk
  let animalsList = animals.map((animal: IAnimal) => {
    let animalLink = `/animal-info/${animal.id}`;
    return (
      <div key={animal.latinName}>
        <Animal animal={animal}></Animal>

        <button key={animal.id}>
          <Link to={animalLink}>Visa mer information om {animal.name}</Link>
        </button>
      </div>
    );
  });

  return <>{animalsList}</>;
}
