import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";

export function AnimalInfo() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animalId, setAnimalId] = useState<number>(0);
  let params = useParams();

  const [isAnimalFed, setIsAnimalFed] = useState<boolean>(false);
  const [timeAnimalWasFed, setTimeAnimalWasFed] = useState<number>(0); //För att beräkna tiden från djuret matats till nuvarande tid
  const [feedingTime, setFeedingTime] = useState<Date>(); //För att kunna skriva ut info om när djuret matats
  const [currentTime, setCurrentTime] = useState<number>(0);

  //Här får animalId samma värde som id:t på djuret vi klickat på
  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  //Här kollar vi om info finns i LS, annars hämtar vi från API
  let animalsInLs: string = localStorage.getItem("animalList") || "[]";
  useEffect(() => {
    if (animalsInLs == "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);
      });
    }
    setAnimals(JSON.parse(animalsInLs));
  }, []);

  useEffect(() => {
    setCurrentTime(new Date().getTime());
  }, [currentTime]);

  function hasBeenFed() {
    setTimeAnimalWasFed(new Date().getTime());
    setFeedingTime(new Date());
    setIsAnimalFed(true);

    checkTime();
  }

  //Här kollar vi ifall det gått mer än 4 timmar sedan djuret matats
  function checkTime() {
    if (timeAnimalWasFed / 1000 <= currentTime / 1000 + 4) {
      //Testa med minuter istället för att se att beräkningen funkar!

      const animalsFromLS = localStorage.getItem("animalList") || "[]";

      const updateAnimalsFromLS: IAnimal[] = JSON.parse(animalsFromLS).map(
        (animal: IAnimal) => {
          if (animal.id === animalId) {
            return { ...animal, isFed: "true" };
          }
        }
      );
      //Uppdaterar "isFed" till "true" om det gått mindre än 4 timmar
      localStorage.setItem("animalList", JSON.stringify(updateAnimalsFromLS));
    }
  }

  //Filtrerar ut djuret vars information ska visas, via id samt skapar upp HTML för det
  let animalList = animals.filter((animal) => animal.id === animalId);
  let animalToPrint = animalList.map((animal: IAnimal) => {
    return (
      <div key={animal.latinName}>
        <h1>{animal.name}</h1>
        <p>Latin-namn: {animal.latinName}</p>
        <p>Födelsedag: {animal.yearOfBirth}</p>
        <p>{animal.longDescription}</p>
        <img src={animal.imageUrl} alt="" width={100} height={100} />
        <button onClick={hasBeenFed} disabled={isAnimalFed}>
          Mata
        </button>
        <div>
          {isAnimalFed && (
            <p>
              {animal.name} matades senast klockan
              {feedingTime?.getHours()}:{feedingTime?.getMinutes()}
            </p>
          )}
        </div>
      </div>
    );
  });

  return <>{animalToPrint}</>;
}
