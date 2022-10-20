export function getUserNameOrEmailPrefix(user) {
  if (!user || !(user instanceof Object)) {
    return null;
  }
  const fullName = [user.firstName, user.lastName]
    .join(' ')
    .trim();

  return fullName === ''
    ? user.email?.split('@')[0]
    : fullName;
}

export function getUserAvatar(user) {
  if (!user || !user.avatars || !user.avatars.length) {
    return null;
  }

  return user.avatars[0].downloadUrl;
}
