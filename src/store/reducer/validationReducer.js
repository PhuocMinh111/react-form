export const validReducer = (
  state = {
    errMaSV: { state: false, msg: "" },
    errTenSV: { state: false, msg: "" },
    errEmail: { state: false, msg: "" },
    errSoDT: { state: false, msg: "" },
    error: false
  },

  { type, payload }
) => {
  let temp = false;
  let message = "";
  switch (type) {
    case "CHECK_MASV":
      const { value, list } = payload;
      const ma = value["maSV"];

      if (ma.length === 0) {
        temp = true;
        message = "mã sinh viên không được bỏ trống";
        return { ...state, errMaSV: { state: temp, msg: message } };
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].maSV == ma) {
          temp = true;
          message = "mã sinh viên không được trùng";
        }
        return { ...state, errMaSV: { state: temp, msg: message } };
      }

      return { ...state, errTenSV: { state: temp, msg: message } };

    case "CHECK_TEN":
      const ten = payload.value["tenSV"];
      if (ten.length < 1) {
        message = "tên không dược bỏ trống";
        temp = true;
      } else if (ten.length > 16) {
        message = "tên không dược dài hơn 16 ký tự";
        temp = true;
      }
      return { ...state, errTenSV: { state: temp, msg: message } };
    case "CHECK_DT":
      const dt = payload.value["soDT"];
      const numRegex = /[0-9]/;
      if (dt.length < 1) {
        temp = true;
        message = "số điện thoại không được bỏ trống";
      } else if (!dt.match(numRegex)) {
        temp = true;
        message = "số diện thoại không được là chữ cái";
      } else if (dt.length < 8 || dt.length > 16) {
        temp = true;
        message = "số diện thoại phải từ 8-16 số";
      }
      return { ...state, errSoDT: { state: temp, msg: message } };

    case "CHECK_MAIL":
      const email = payload.value["email"];
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.length < 1) {
        temp = true;
        message = "email không được bỏ trống";
      } else if (!email.match(emailRegex)) {
        temp = true;
        message = "email phải đúng dạng ";
      }
      return { ...state, errEmail: { state: temp, msg: message } };
    default:
      return { ...state };
  }
};
