const removeRequest = function removeRequest(searchid) {
  return {
    type: "REMOVE_REQUEST",
    searchid
  };
};

export default removeRequest;
