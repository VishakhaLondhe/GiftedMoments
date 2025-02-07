

export function flattenObject(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}


export function handleAxiosError(error) {
  if (!error.response) {
    return { status: false, message: "Network not available. Please check your internet connection.", error };
  }
  if (error.response.status >= 400 && error.response.status < 500) {
    return { status: false, message: `Request denied: ${error.response.data.message || "Invalid request"}`, error };
  }
  return { status: false, message: "An unexpected error occurred. Please try again later.", error };
}
