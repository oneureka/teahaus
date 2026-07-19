import { useRouter } from "@tarojs/taro";

type ParamParser<T> = (raw: string | undefined) => T;

export type QuerySchema<T extends Record<string, unknown>> = {
  [K in keyof T]: ParamParser<T[K]>;
};

export function useQueryParams<T extends Record<string, unknown>>(
  schema: QuerySchema<T>,
): T {
  const params = useRouter().params;
  const result = {} as T;

  (Object.keys(schema) as (keyof T)[]).forEach((key) => {
    const parser = schema[key];
    result[key] = parser(params[key as string]);
  });

  return result;
}
