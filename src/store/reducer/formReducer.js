const DEFAULT = {
  sv: [],
  selected: null,
};
export const formReducer = (state = DEFAULT, { type, payload }) => {
  switch (type) {
    case "ADD":
      let data = [...state.sv];
      data.push(payload);
      return { ...state, sv: [...data] };
    case "EDIT":
      return { ...state, selected: { ...payload } };
    case "DEL":
      state.sv = state.sv.filter((sv) => sv.maSV !== payload);
      return { ...state };
    case "EDIT_USER":
      console.log("edit");
      state.sv = state.sv.map((ele) => {
        if (ele.maSV === payload.maSV) {
          return payload;
        }
        return ele;
      });
    default:
      return state;
  }
};
