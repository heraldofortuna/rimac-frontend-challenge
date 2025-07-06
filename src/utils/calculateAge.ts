export const calculateAge = (birthDateString: string): number => {
  if (!birthDateString) return 0;

  const [day, month, year] = birthDateString.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  if (isNaN(birthDate.getTime())) {
    throw new Error("Fecha de nacimiento inválida");
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
