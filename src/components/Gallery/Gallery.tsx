import { useCallback, useEffect, useState } from "react";
import stylesUtil from "../../utilities/styles.module.css";
import styles from "./Gallery.module.css";

interface TGallery {
  id: number;
  src: string;
  alt?: string;
}

const Gallery = ({ items }: { items: TGallery[] }) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrent((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // on Destroy cleanup
    () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      className={[
        stylesUtil.w100,
        stylesUtil.maxW800px,
        stylesUtil.h600px,
        stylesUtil.pRel,
        styles.imgWrapper,
      ].join(" ")}
    >
      <button
        aria-label="Previous image"
        className={[
          styles.button,
          stylesUtil.pAbs,
          stylesUtil.top0,
          stylesUtil.left0,
          stylesUtil.z1,
          stylesUtil.bgBlack4,
          stylesUtil.h100,
          stylesUtil.shadow2,
          stylesUtil.cWhite7,
          stylesUtil.bNone,
          stylesUtil.fontXL,
        ].join(" ")}
        disabled={current === 0}
        onClick={() => handlePrev()}
      >
        {"<"}
      </button>
      <ul
        className={[
          stylesUtil.itemsStretch,
          stylesUtil.h100,
          styles.listImages,
        ].join(" ")}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <li
            key={item.id || index}
            className={[stylesUtil.wh100, styles.listImage].join(" ")}
          >
            <img
              className={stylesUtil.wh100}
              src={current + 2 >= index ? item.src : undefined}
              alt={item.alt || `Gallery Image ${(index + 1).toString()}`}
            />
          </li>
        ))}
      </ul>
      <button
        className={[
          styles.button,
          stylesUtil.pAbs,
          stylesUtil.top0,
          stylesUtil.right0,
          stylesUtil.z1,
          stylesUtil.bgBlack4,
          stylesUtil.h100,
          stylesUtil.shadow2,
          stylesUtil.cWhite7,
          stylesUtil.bNone,
          stylesUtil.fontXL,
        ].join(" ")}
        disabled={current === items.length - 1}
        onClick={() => handleNext()}
      >
        {">"}
      </button>

      <div
        className={[
          styles.indicators,
          stylesUtil.pAbs,
          stylesUtil.justifyCenter,
          stylesUtil.flexGap8,
          stylesUtil.left0,
          stylesUtil.right0,
          stylesUtil.z1,
        ].join(" ")}
      >
        {items.map((_, index) => {
          return (
            <button
              key={index}
              className={[
                styles.dot,
                stylesUtil.bgWhite5,
                stylesUtil.br128,
                current === index ? styles.dotActive : "",
              ].join(" ")}
              aria-label={`Go to image ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export { Gallery };
export type { TGallery };
