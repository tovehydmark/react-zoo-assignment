import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";

export function AnimalInfo() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animalId, setAnimalId] = useState<number>(0);
  let params = useParams();

  const [feed, setFeed] = useState<boolean>(false);

  //Här blir animalId samma som det vi klickat på
  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  //Här kollar vi om info finns i LS, annars hämtar vi från API
  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";

    setAnimals(JSON.parse(animalsInLs));
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

  let animalList = animals.filter((animal) => animal.id === animalId);

  let animalToPrint = animalList.map((animal: IAnimal) => {
    return (
      <div key={animal.latinName}>
        <h1>{animal.name}</h1>
        <p>Latin-namn: {animal.latinName}</p>
        <p>Födelsedag: {animal.yearOfBirth}</p>
        <p>{animal.longDescription}</p>
        <img src={animal.imageUrl} alt="" width={100} height={100} />
        <button onClick={hasBeenFed}>Mata</button>
      </div>
    );
  });

  return <>{animalToPrint}</>;
}
