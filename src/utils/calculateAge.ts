export const calculateAge = (birthDateString: string): number => {
  if (!birthDateString) return 0;

  const [day, month, year] = birthDateString.split("-").map(Number);

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    throw new Error("Fecha de nacimiento inválida");
  }

  const birthDate = new Date(year, month - 1, day);
  if (
    isNaN(birthDate.getTime()) ||
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    throw new Error("Fecha de nacimiento inválida");
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age < 0 ? 0 : age;
};
