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
    case "VALIDATION":
      const { value, list } = payload;
      console.log(value);
      const ma = value["maSV"];
      if (payload.selected) {
        if (ma.length === 0) {
          state = {
            ...state,
            errMaSV: {
              state: true,
              msg: "mã sinh viên không được bỏ trống",
            },
          };
        }
        for (let i = 0; i < list.length; i++) {
          if (list[i].maSV === ma) {
            state = {
              ...state,
              errMaSV: {
                state: true,
                msg: "mã sinh viên không được trung",
              },
            };
          }
        }
      }
      const ten = payload.value["tenSV"];
      if (ten.length < 1) {
        state = {
          ...state,
          errTenSV: {
            state: true,
            msg: "tên không dược bỏ trống",
          },
        };
      } else if (ten.length > 16) {
        state = {
          ...state,
          errTenSV: {
            state: true,
            msg: "tên không dược dài hơn 16 ký tự",
          },
        };
      }
      const dt = payload.value["soDT"];
      const numRegex = /[0-9]/;
      if (dt.length < 1) {
        state = {
          ...state,
          errSoDT: {
            state: true,
            msg: "số điện thoại không được bỏ trống",
          },
        };
      }
      if (!dt.match(numRegex)) {
        state = {
          ...state,
          errSoDT: {
            state: true,
            msg: "số diện thoại không được là chữ cái",
          },
        };
      }
      if (dt.length <= 6 || dt.length >= 16) {
        state = {
          ...state,
          errSoDT: {
            state: true,
            msg: "số diện thoại phải từ 6-16 số",
          },
        };
      }

      const email = payload.value["email"];
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (email.length < 1) {
        state = {
          ...state,
          errEmail: {
            state: true,
            msg: "email không được bỏ trống",
          },
        };
      } else if (!email.match(emailRegex)) {
        state = {
          ...state,
          errEmail: {
            state: true,
            msg: "email phải đúng dạng ",
          },
        };
      }
      return { ...state };
    default:
      return state;
  }
};
