export const dateUtil = {
  format(val: number) {
    const date = new Date(val);
    return `${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getDate()}, ${date.getFullYear()}`;
  },
};
