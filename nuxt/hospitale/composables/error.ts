export interface InputObject {
  value?: unknown;
  error: string;
}

export interface InputErrorHandler {
  checkForInputErrors(inputs: Array<InputObject>): boolean;
}

export function useError(): InputErrorHandler {
  return {
    checkForInputErrors(inputs) {
      let hasError = false;
      inputs.forEach((e) => {
        if (!e.value) {
          e.error = 'This field is required';
        } else {
          e.error = '';
        }
      });
      if (inputs.find((e) => e.error)) {
        hasError = true;
      }
      return hasError;
    },
  };
}
