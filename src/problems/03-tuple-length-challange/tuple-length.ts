import type { EqualCustom, ExpectCustom } from "@local/types";

type Length<T extends readonly any[]> = T["length"];

const tesla = ["tesla", "model-3", "model-X", "model-Y"] as const;
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
] as const;

type teslaLength = Length<typeof tesla>; // 4
type spaceXLength = Length<typeof spaceX>; // 5

type cases = [
  ExpectCustom<EqualCustom<teslaLength, 4>>,
  ExpectCustom<EqualCustom<spaceXLength, 5>>,
  // @ts-expect-error - should only accept arrays/tuples
  Length<5>,
  // @ts-expect-error - should only accept arrays/tuples
  Length<"hello-world">,
];
