export const stringUtil = {
  removeHTMLTags: (val: string) => {
    return val.replace(/(<([^>]+)>)/gi, "");
  },
};
