const DEFAULT = {
  sv: [],
  selected: null,
};
export const formReducer = (state = DEFAULT, { type, payload }) => {
  switch (type) {
    case "ADD":
      let data = [...state.sv];
      console.log(data);
      data.push(payload);
      return { ...state, sv: [...data] };
    case "EDIT":
      return { ...state, selected: { ...payload } };
    default:
      return state;
  }
};
