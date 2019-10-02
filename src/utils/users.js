// File responsible for keeping track of users in an array
const users = [];

const addUser = ({ id, username, room }) => {
  // Add user
  // Clean data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate data-> If data is invalid, if statement runs
  if (!username || !room) {
    return {
      error: "Username and room are required!"
    };
  }
  const existingUser = users.find(user => {
    // Check for existing user
    return user.room === room && user.username === username; // Return true if user searched is in same chat room, username is unique
  });
  if (existingUser) {
    // validate username
    return {
      error: "Username is already in use. Please try again."
    };
  }
  //   Only run if user is valid
  const user = { id, username, room }; //   Store user -> create an object, push into array, and return result
  users.push(user);
  return { user };
};
// Remove user
const removeUser = id => {
  // Find index of user with a specific id -> returns position in array
  // Return true when user id matches id searched for
  const index = users.findIndex(user => user.id === id);
  // If index isn't equal to -1, match
  if (index !== -1) {
    // Array method to remove array items by their index
    return users.splice(index, 1)[0]; // Will return user objects, array method ends when match is found
  }
};
const getUser = id => {
  // .find array method -> returns match if match exists
  return users.find(user => user.id === id);
};
// Allows us to track all users in a given room
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  // Array method
  return users.filter(user => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
