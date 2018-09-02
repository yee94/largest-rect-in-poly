interface IOptions {
  maxAspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  tolerance?: number;
  nTries?: number;
  angle?: Array<number> | number | string;
  aspectRatio?: Array<number> | number | string;
  origin?: Array<Array<number>> | Array<number>;
}

export default function findLargestRect(
  poly: Array<Array<number>>,
  options?: IOptions,
): [{ width: number; height: number; cx: number; cy: number; angle: number }, number, any];
