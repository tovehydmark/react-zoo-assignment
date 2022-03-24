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
  useEffect(() => {
    let animalsInLs: string = localStorage.getItem("animalList") || "[]";

    if (animalsInLs == "[]") {
      //Hämtar API data via services
      getAnimalService().then((response) => {
        setAnimals(response.data);
        //Sparar även till LS från API-anropet
        localStorage.setItem("animalList", JSON.stringify(response.data));
      });
    }
    setAnimals(JSON.parse(animalsInLs));
  }, []);

  useEffect(() => {
    setCurrentTime(new Date().getTime());
  }, [currentTime]);

  function hasBeenFed() {
    let updateAnimalList: IAnimal[] = [];

    let animal = animals.find((animal) => {
      if (animal.id === animalId) {
        setIsAnimalFed(!isAnimalFed);
        animal.isFed = true;
        animal.lastFed = JSON.stringify(new Date());
      }
      updateAnimalList.push(animal);

      localStorage.setItem("animalList", JSON.stringify(updateAnimalList));
      console.log(JSON.stringify([animal]));
    });

    setTimeAnimalWasFed(new Date().getTime());
    setFeedingTime(new Date());
    setIsAnimalFed(true);
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

// //Här kollar vi ifall det gått mer än 3 timmar sedan djuret matats
// function checkTime() {
//   const animalsFromLS = localStorage.getItem("animalList") || "[]";

//   // if (timeAnimalWasFed / 1000 <= currentTime / 1000 + 3) {
//   //Testa med minuter istället för att se att beräkningen funkar!

//   let updateAnimalsFromLS: IAnimal[] = JSON.parse(animalsFromLS).map(
//     (animal: IAnimal) => {
//       if (animal.id === animalId) {
//         animal.isFed = true;
//         return animal;
//       }
//     }
//   );

//   let animalsThatHaveEaten: string[] = [];
//   animalsThatHaveEaten.push(JSON.stringify(animals));

//   //Uppdaterar "isFed" till "true" om det gått mindre än 4 timmar
//   localStorage.setItem("animalFed", JSON.stringify(animalsThatHaveEaten));
//   // }
// }

// useEffect(() => {
//   // let fedAnimalsFromLS = localStorage.getItem("fedAnimals") || "[]";
//   // let fedAnimalsString: string[] = JSON.parse(fedAnimalsFromLS);
//   // // setIsAnimalFed(true);

//   // if (isAnimalFed === true) {
//   //   //Ändra på denna ?? Så den tittar i LS för att se om animal id ligger där, och om ID ligger där så ska den sätta isAnimalFed === true så att knappen är utgråad. Om det gått mer ön 3 timmar ska isAnimalFed===false. Sen kanske den behöver ligga i en annan useEffect, eller bara ha en tom lista på slutet
//   //   fedAnimalsString.push(JSON.stringify(animalId));
//   // }
//   // localStorage.setItem("fedAnimals", JSON.stringify(fedAnimalsString));
// }, []);
