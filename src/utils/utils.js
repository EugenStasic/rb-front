export const getErrorMessage = (error) => {
    let errorMessage = "Unknown error occurred";

    if (typeof error === "string") {
        errorMessage = error;
    } else if (error && error.message) {
        errorMessage = error.message;
    } else if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        errorMessage = error.errors[0].msg;
    }

    return { message: errorMessage };
}