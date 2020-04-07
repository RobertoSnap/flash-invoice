export const useSpace = () => {
  const getName = async (space: any) => {
    return await space.public.get("name");
  };

  return {
    getName
  };
};
