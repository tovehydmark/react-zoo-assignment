import { IAnimal } from "../models/IAnimal";

interface IAnimalProps {
  animal: IAnimal;
}

export function Animal(props: IAnimalProps) {
  function showAnimalInfo(id: number) {
    console.log(id);
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
    </>
  );
}
