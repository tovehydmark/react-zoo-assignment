import { useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { AnimalInfo } from "./AnimalInfo";

interface IAnimalProps {
  animal: IAnimal;
}

export function Animal(props: IAnimalProps) {
  const [animalId, setAnimalId] = useState<number>(0);

  function showAnimalInfo(id: number) {
    setAnimalId(id);
  }

  return (
    <>
      <div>
        <h1>{props.animal.name}</h1>
        <p>{props.animal.shortDescription}</p>
        <button
          onClick={() => {
            showAnimalInfo(props.animal.id);
          }}
        >
          Visa mer info om {props.animal.name}
        </button>
      </div>
      <AnimalInfo id={animalId}></AnimalInfo>
    </>
  );
}
