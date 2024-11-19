export interface InputObject {
    value?: unknown;
    error: string;
}

export interface PageError {
    checkForInputErrors(inputs: Array<InputObject>): boolean;
}

export function useErrors(): PageError {
    return {
        checkForInputErrors(inputs) {
            let hasError = false;
            inputs.forEach((input) => {
                if (!input.value) {
                    input.error = 'This field is required';
                } else {
                    input.error = '';
                }
            });
            if (inputs.find((e) => e.error)) {
                hasError = true;
            }
            return hasError;
        },
    };
}
