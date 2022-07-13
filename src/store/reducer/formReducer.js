const DEFAULT = {
  sv: [],

  err: {
    userName: "",
    fullName: "",
    email: "",
    pass: "",
    phone: "",
    type: "",
  },
};
export const formReducer = (state = DEFAULT, { type, payload }) => {
  switch (type) {
    case "ADD":
      const temp = [...state.sv];
      temp.push(payload);
      return { ...state, sv: [...temp] };
    default:
      return state;
  }
};
