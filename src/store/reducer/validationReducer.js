export const validReducer = (
  state = {
    errMaSV: { state: false, msg: "" },
    errTenSV: { state: false, msg: "" },
    errEmail: { state: false, msg: "" },
    errSoDT: { state: false, msg: "" }
  },
  { type, payload }
) => {
  let temp = false;
  let message = "";
  switch (type) {
    case "CHECK_MASV":
      const { value, list } = payload;
      const ma = value["maSV"];
      console.log("check ma");

      let index = -1;
      if (ma.length === 0) {
        temp = true;
        message = "mã sv không được bỏ trống";
      }
      for (let i = 0; i < list.length; i++) {
        if (!list[i]) return;
        if (list[i].maSV == ma) {
          index = i;
          temp = true;
          message = "mã sinh viên tồn tại";
        }
      }

      return { ...state, errMaSV: { state: temp, msg: message } };

    case "CHECK_TEN":
      const ten = payload.value["tenSV"];
      if (ten.length < 1) {
        message = "tên không dược bỏ trống";
        temp = true;
      }
      if (ten.length > 16) {
        message = "tên không dược dài hơn 16 ký tự";
        temp = true;
      }
      return { ...state, errTenSV: { state: temp, msg: message } };
    case "CHECK_DT":
      const dt = payload.value["soDT"];
      if (dt.length < 1) {
        temp = true;
        message = "số điện thoại không được bỏ trống";
      }
      return { ...state, errSoDT: { state: temp, msg: message } };

    default:
      return state;
  }
};
