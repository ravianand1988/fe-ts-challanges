import { useEffect, useState } from "react";
import styles from "./StarRating.module.css";

interface TStarRating {
  defaultRating?: number;
  starCount?: number;
  readonly?: boolean;
  rate?: number;
  onChange?: (starValue: number) => void;
}

const STAR_RATING_DEFAULT: TStarRating = {
  defaultRating: 0,
  starCount: 5,
  readonly: false,
  rate: 0,
}

const STAR_EMOJI = '⭐️';

const StarRating = (props: TStarRating) => {
  const opts = {...STAR_RATING_DEFAULT, ...props};
  const [currentRate, setCurrentRate] = useState(opts.rate!);
  const [hoverValue, setHoverValue] = useState(0);

  function handleRating(i: string) {
    const rate = Number(i);
    setCurrentRate(rate+1);
    opts.onChange!(rate+1);
  }

  useEffect(() => {
   if (opts.defaultRating! > 0) {
    setCurrentRate(opts.defaultRating!)
   }
  },[])

  return (
    <>
      <p>I am a star rating component!</p>
      {
        Array.from(
          { length: opts.starCount! },
          (_, i) => <button
              className={[
                styles.btnStar,
                i < currentRate ? styles.btnRated : styles.btnNotRated,
                i < hoverValue ? styles.btnStarHover : ''
              ].join(' ')}
              key={i}
              type="button"
              role="radio"
              disabled={opts.readonly}
              aria-readonly={opts.readonly}
              aria-label={`${currentRate} Star${currentRate === 1 ? '' : 's'}`}
              aria-checked={opts.rate === currentRate}
              onMouseEnter={() => setHoverValue(i+1)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => handleRating(i.toString())}
            >
              {/* { i+1 } */}
              <span className={[
                styles.star,
                i < hoverValue ? styles.starHover : ''
                ].join(' ')}
              >{ STAR_EMOJI }</span>
            </button>
          )
      }
      <p className={styles.starResult}>
        <em>{currentRate} out of {opts.starCount}</em>
      </p>
    </>
  )
};

export { StarRating };
