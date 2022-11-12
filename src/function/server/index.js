/**
 * user id가 없으면 users에 추가
 * user id가 있으면 해당 user의 userName을 변경
 *
 * @param {User[]} users
 * @param {User} user
 * @returns void
 */
const pushUser = (users, user) => {
  const index = users.findIndex(({ id }) => id === user.id);

  if (index === -1) {
    users.push(user);
    return;
  }

  users[index] = {
    ...users[index],
    userName: user.userName,
  };
};

/**
 * user id가 있으면 users에서 제거
 *
 * @param {User[]} users
 * @param {string} id
 * @returns void
 */
const removeUser = (users, id) => {
  const index = users.findIndex((user) => id === user.id);

  if (index !== -1) users.splice(index, 1);
};

exports.pushUser = pushUser;
exports.removeUser = removeUser;
