import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";
import { Button } from "./styledComponents/Button";

export function AnimalInfo() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animalId, setAnimalId] = useState<number>(0);
  let params = useParams();

  const [isAnimalFed, setIsAnimalFed] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);

  //Här får animalId samma värde som id:t på djuret vi klickat på
  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  //Kontrollerar om info finns i LS, annars hämtar vi från API + sparar i LS
  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";

    if (animalsInLs == "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);
        localStorage.setItem("animalList", JSON.stringify(response.data));
      });
    }
    setAnimals(JSON.parse(animalsInLs));
  }, []);

  useEffect(() => {
    animals.find((animal) => {
      if (animal.id === animalId && animal.isFed === true) {
        setIsAnimalFed(!isAnimalFed);
      } else {
      }
    });
  }, [animals]);

  useEffect(() => {
    setCurrentTime(new Date().getTime());
  }, [currentTime]);

  //Updaterar animalList i local storage vid matning, ändrar isFed and lastFed
  function feedAnimal() {
    let updateAnimalListWhenFed: IAnimal[] = [];

    animals.find((animal) => {
      if (animal.id === animalId) {
        setIsAnimalFed(!isAnimalFed);
        animal.isFed = true;
        animal.lastFed = JSON.stringify(new Date());
      }

      updateAnimalListWhenFed.push(animal);

      localStorage.setItem(
        "animalList",
        JSON.stringify(updateAnimalListWhenFed)
      );
    });
  }

  //Filtrerar ut djuret vars information ska visas, via id samt skapar upp HTML för att visa information om djuret
  let filterOutCurrentAnimal = animals.filter(
    (animal) => animal.id === animalId
  );
  let animalInformationToPrint = filterOutCurrentAnimal.map(
    (animal: IAnimal) => {
      return (
        <div key={animal.latinName}>
          <h1>{animal.name}</h1>
          <p>Latin-namn: {animal.latinName}</p>
          <p>Födelsedag: {animal.yearOfBirth}</p>
          <p>Eventuella mediciner: {animal.medicine}</p>
          <p>{animal.longDescription}</p>
          <img src={animal.imageUrl} alt="" width={100} height={100} />
          <Button onClick={feedAnimal} disabled={isAnimalFed}>
            Mata {animal.name}
          </Button>
          <div>
            {isAnimalFed && (
              <p>
                {animal.name} matades senast klockan
                {" " + JSON.parse(animal.lastFed)}
              </p>
            )}
          </div>
        </div>
      );
    }
  );

  return <>{animalInformationToPrint}</>;
}
