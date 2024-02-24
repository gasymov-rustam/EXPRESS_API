const userDto = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    dateOfBirth: user.dateOfBirth,
    bio: user.bio,
    location: user.location,
  };
};

module.exports = { userDto };