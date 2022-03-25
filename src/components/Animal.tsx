import { IAnimal } from "../models/IAnimal";

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
