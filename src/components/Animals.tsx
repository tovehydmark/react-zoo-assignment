import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";

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
    return (
      <div key={animal.name}>{animal.name}</div>
      //Ändra key till id
    );
  });

  return (
    <>
      <p>{animalsList}</p>
    </>
  );
}
