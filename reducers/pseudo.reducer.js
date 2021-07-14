export default pseudoReducer = (state = "", action) => {
  // Do something
  switch (action.type) {
    case "savePseudo":
      return action.pseudo;
      break;
    default:
      return state;
  }
};
