import { useState } from "react";
import { StarRating } from "./StarRating";
import { StarRatingMaster } from "./StarRatingMaster";

const StarRatingExample = () => {
  const [rating, setRating] = useState(0)
  function handleChange($event: any) {
    console.log($event)
    setRating($event);
  }
  return (
    <>
      <StarRating />
      <StarRating starCount={10} onChange={($event) => console.log('star on change emit: ', $event)} />
      <StarRating defaultRating={4} />
      <StarRating defaultRating={3} readonly />
      <br/>
      <h3>Star rating example master.dev</h3>
      <StarRatingMaster value={rating} onChange={handleChange}></StarRatingMaster>
    </>
  );
}

export { StarRatingExample }
