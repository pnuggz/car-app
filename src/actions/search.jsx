const searchRequest = function searchRequest({
  selectMake,
  selectModel,
  selectLocation,
  minPrice,
  maxPrice
}) {
  return {
    type: "SEARCH_REQUEST",
    selectMake,
    selectModel,
    selectLocation,
    minPrice,
    maxPrice
  };
};

export default searchRequest;
