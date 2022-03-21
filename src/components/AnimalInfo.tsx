interface IAnimalInfoProps {
  id: number;
}

export function AnimalInfo(props: IAnimalInfoProps) {
  return (
    <>{<div>Animal-Id från förälderkomponenten Animal = {props.id}</div>}</>
  );
}
