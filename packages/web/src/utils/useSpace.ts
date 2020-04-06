export const useSpace = (space: any) => {
  const getName = async () => {
    return await space.public.get("name");
  };

  return {
    getName
  };
};
