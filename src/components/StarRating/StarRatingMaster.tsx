import style from './StarRating.module.css'
import styleRoot from '../../utilities/styles.module.css'
import { useCallback } from 'react'

interface TStarRatingProps {
  readonly?: boolean,
  value: number,
  onChange: (value: number) => void
}

const EMOJIS = ['⭐️', '⭐️', '⭐️', '⭐️', '⭐️'] as const

export const StarRatingMaster = ({ readonly, value, onChange }: TStarRatingProps) => {
  const handleStarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (readonly) {
        return;
      }
      const button = (event.target as HTMLElement).closest('button');
      if (!button) {
        return;
      }
      const starValue = Number(button.dataset.starValue)
      if (!Number.isNaN(starValue)) {
        onChange(starValue);
      }
    },
    [readonly, onChange]
  )

  return (
    <div
      className={[
        styleRoot.container, styleRoot.wh100
      ].join( )}
      onClick={handleStarClick}
      role="radiogroup"
      area-label="star-rating"
      area-readonly={readonly}
    >
      <input type="number" value={value} readOnly hidden />
      <div className={styleRoot.flexRowCenter}>
        {
          EMOJIS.map((emoji, index) => {
            const starValue = index + 1;
            return (
              <button
                aria-readonly={readonly}
                data-star-value={starValue}
                className={[
                  style.star,
                  styleRoot.flexColumnCenter,
                  styleRoot.fontXL
                ].join(' ')}
                aria-label={`${starValue} Star${starValue === 1 ? '' : 's'}`}
                aria-checked={value === starValue}
                role='radio'
                type="button"
                key={index}
                data-active={ value >= starValue }
                disabled={readonly}
                >
                <span>{emoji}</span>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
