export default POIsReducer = (state = [], action) => {
    // Do something
    switch (action.type) {
      case "addPOI":
        return [...state, action.POI];
      case "deletePOI":
        return state.filter(POI => (POI.latitude !== action.POI.latitude) || (POI.longitude !== action.POI.longitude));
      default:
        return state;
    }
  };
  