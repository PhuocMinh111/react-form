export const validReducer = (
  state = {
    errMaSV: { state: false, msg: "" },
    errTenSV: { state: false, msg: "" },
    errEmail: { state: false, msg: "" },
    errSoDT: { state: false, msg: "" },
  },
  { type, payload }
) => {
  switch (type) {
    case "CHECK_MASV":
      const { value, list } = payload;
      const ma = value["maSV"];
      let temp = false;
      let message = "";
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (!list[i]) return;
        if (list[i].maSV == ma) {
          index = i;
          temp = true;
          message = "mã sinh viên tồn tại";
        }
      }
      return { ...state, errMaSV: { state: temp, msg: message } };

    default:
      return state;
  }
};
