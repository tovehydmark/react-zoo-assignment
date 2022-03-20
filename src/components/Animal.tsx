import { IAnimal } from "../models/IAnimal";

interface IAnimalProps {
  animal: IAnimal;
}

export function Animal(props: IAnimalProps) {
  return (
    <>
      <div>{props.animal.name}</div>
    </>
  );
}
