export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
};
