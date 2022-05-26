export default (fullName = "") => {
  const names = fullName?.split(/[ -]+/);
  if (names?.length < 2) return names[0][0];
  return names[0][0] + names[names?.length - 1][0];
};
