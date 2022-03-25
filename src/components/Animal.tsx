import { IAnimal } from "../models/IAnimal";
import { Div } from "./styledComponents/Div";

interface IAnimalProps {
  animal: IAnimal;
}

export function Animal(props: IAnimalProps) {
  return (
    <>
      <Div>
        <h1>{props.animal.name}</h1>
        <p>{props.animal.shortDescription}</p>
      </Div>
    </>
  );
}
