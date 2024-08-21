export const delimiter = (value: number) =>
  new Intl.NumberFormat("id-ID", {}).format(value);
