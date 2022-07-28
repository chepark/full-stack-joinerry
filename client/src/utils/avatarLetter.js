export const avatarLetter = (user) => {
  return user?.userName?.slice(0, 1) || user?.email?.slice(0, 1);
};
