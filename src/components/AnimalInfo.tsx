import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { getAnimalService } from "../services/getAnimalService";

export function AnimalInfo() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [animalId, setAnimalId] = useState<number>(0);
  let params = useParams();

  const [isAnimalFed, setIsAnimalFed] = useState<boolean>(false);
  const [timeAnimalWasFed, setTimeAnimalWasFed] = useState<number>(0); //För att enkelt beräkna tiden från djuret matats till nuvarande tid, satt i millisekunder
  // const [feedingTime, setFeedingTime] = useState<string>(""); //För att kunna skriva ut info om när djuret matats
  const [currentTime, setCurrentTime] = useState<number>(0);

  //Här får animalId samma värde som id:t på djuret vi klickat på
  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  //Här kollar vi om info finns i LS, annars hämtar vi från API
  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";

    //Hämtar API data via services + Sparar datat till LS
    if (animalsInLs == "[]") {
      getAnimalService().then((response) => {
        setAnimals(response.data);
        localStorage.setItem("animalList", JSON.stringify(response.data));
      });
    }
    setAnimals(JSON.parse(animalsInLs));
  }, []);

  useEffect(() => {
    setCurrentTime(new Date().getMilliseconds());

    let current = Math.floor(currentTime / (1000 * 60 * 60));

    if (current > timeAnimalWasFed + 3) {
      console.log("current time is larger than time animal was fed");
      console.log(current);
      console.log(timeAnimalWasFed);

      //Varför kommer jag in här?? tycker inte att current borde vara större än timeAnimalWasFed
    }
  }, [animals]);

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

  //Updates list in local storage, changing isFed and lastFed
  function feedAnimal() {
    let updateAnimalListWhenFed: IAnimal[] = [];

    animals.find((animal) => {
      if (animal.id === animalId) {
        setIsAnimalFed(!isAnimalFed);
        animal.isFed = true;
        animal.lastFed = JSON.stringify(new Date());
      }

      //animalfeedingtime ca 500
      let animalFeedingTime = new Date().getMilliseconds();
      console.log("animalFeedingTime: " + animalFeedingTime);

      //newTime genererar noll
      let newTime = Math.floor(animalFeedingTime / (1000 * 60 * 60));

      //New time genererar noll
      console.log("new time: " + newTime);

      setTimeAnimalWasFed(newTime);
      //timeanimalwasfed är också noll
      console.log("time animal was fed: " + timeAnimalWasFed);

      updateAnimalListWhenFed.push(animal);

      localStorage.setItem(
        "animalList",
        JSON.stringify(updateAnimalListWhenFed)
      );
    });
  }

  //Filtrerar ut djuret vars information ska visas, via id samt skapar upp HTML för det
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
          <p>{animal.longDescription}</p>
          <img src={animal.imageUrl} alt="" width={100} height={100} />
          <button onClick={feedAnimal} disabled={isAnimalFed}>
            Mata
          </button>
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
