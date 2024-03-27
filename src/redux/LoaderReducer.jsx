const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) => {
  if (action.type === "showLoading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "hideLoading") {
    return {
      ...state,
      loading: false,
    };
  } else {
    return {
      ...state,
    };
  }
};
export {loaderReducer}