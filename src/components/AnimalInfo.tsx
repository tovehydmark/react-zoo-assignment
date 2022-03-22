import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";

interface IAnimalInfoProps {
  id: number;
}

export function AnimalInfo(props: IAnimalInfoProps) {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const [feed, setFeed] = useState<boolean>(false);

  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";
    if (animalsInLs == "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);
      });
    }
  }, []);

  function hasBeenFed() {
    setFeed(!feed);
    console.log(feed);
  }

  let animalsList = animals.map((animal: IAnimal) => {
    if (animal.id === props.id) {
      return (
        <div key={animal.id}>
          <h1>{animal.name}</h1>
          <p>Latin-namn: {animal.latinName}</p>
          <p>Födelsedag: {animal.yearOfBirth}</p>
          <p>{animal.longDescription}</p>
          <img src={animal.imageUrl} alt="" width={100} height={100} />

          <button onClick={hasBeenFed}>Mata</button>
        </div>
      );
    }
  });
  return (
    <>
      {<div>Animal-Id från förälderkomponenten Animal = {props.id}</div>}
      {animalsList}
    </>
  );
}
