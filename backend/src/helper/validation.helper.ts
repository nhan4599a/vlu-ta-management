import { BadRequestError } from "../types/integration.types";

export type ParseNumberOption = {
  allowNegative?: boolean;
  allowDecimal?: boolean;
  min?: number;
  max?: number;
};

const defaultParseNumberOption: ParseNumberOption = {
  allowDecimal: true,
  allowNegative: true,
};

export const isNumber = (
  valueStr: any,
  options: ParseNumberOption = defaultParseNumberOption
) => {
  const numberValue = Number(valueStr);

  if (Number.isNaN(numberValue)) {
    return false;
  }

  if (numberValue < 0 && options?.allowNegative) {
    return false;
  }

  if (numberValue !== Math.floor(numberValue) && options.allowDecimal) {
    return false;
  }

  return (
    (options.min ?? Number.MIN_VALUE) <= numberValue &&
    numberValue <= (options.max ?? Number.MAX_VALUE)
  );
};

export const throwValidationError = (message: string) => {
    throw new BadRequestError(message)
}
