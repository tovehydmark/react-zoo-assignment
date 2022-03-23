import { useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { AnimalInfo } from "./AnimalInfo";

interface IAnimalProps {
  animal: IAnimal;
}

export function Animal(props: IAnimalProps) {
  return (
    <>
      <div>
        <h1>{props.animal.name}</h1>
        <p>{props.animal.shortDescription}</p>
      </div>
    </>
  );
}
