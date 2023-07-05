export const dateUtil = {
  format(val: number) {
    const date = new Date(val);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;
  },
};
