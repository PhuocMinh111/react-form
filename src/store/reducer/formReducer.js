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
      let data = [...state.sv];
      console.log(data);
      data.push(payload);
      return { ...state, sv: [...data] };
    default:
      return state;
  }
};
