import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";

export function AnimalInfo() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animalId, setAnimalId] = useState<number>(0);
  let params = useParams();

  const [isAnimalFed, setIsAnimalFed] = useState<boolean>(false);
  const [timeWhenFeedingAnimal, setTimeWhenFeedingAnimal] = useState<Date>();

  const [feedingTime, setFeedingTime] = useState("");

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
    setIsAnimalFed(!isAnimalFed);
    setTimeWhenFeedingAnimal(new Date());
  }

  useEffect(() => {
    if (isAnimalFed) {
      setFeedingTime(JSON.stringify(setTimeWhenFeedingAnimal));
    }
  }, []);

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
          {" "}
          {isAnimalFed && (
            <p>
              {animal.name} matades senast klockan
              {timeWhenFeedingAnimal?.getHours()}:
              {timeWhenFeedingAnimal?.getMinutes()}
            </p>
          )}
        </div>
      </div>
    );
  });

  return <>{animalToPrint}</>;
}

//if current-time > time of animal fed {
//   fedbutton unclickable
// } else (
//   time of animal fed nollställs and button is clickable again
// )
