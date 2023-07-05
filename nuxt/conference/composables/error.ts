export interface InputObject {
  value?: any;
  error: string;
}

export const useError = () => {
  const checkForInputErrors = (obj: Array<InputObject>) => {
    let hasError = false;

    obj.forEach((e) => {
      if (!e.value) {
        e.error = "This field is required";
      } else {
        e.error = "";
      }
    });

    if (obj.find((e) => e.error)) {
      hasError = true;
    }

    return hasError;
  };

  return {
    checkForInputErrors,
  };
};
