export function capitalizeFirstLetter(string = "") {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringifyError(error, includeStack = false) {
  const errorObject = {
    message: error?.message || "Unknown error",
    name: error?.name || "Error",
    // Conditionally include the stack property
    ...(includeStack && { stack: error?.stack || "No stack trace available" }),
    ...error, // Spread other enumerable properties if any
  };
  return JSON.stringify(errorObject, null, 2); // Pretty print with indentation
}
