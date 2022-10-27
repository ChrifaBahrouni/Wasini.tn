import axios from "axios";
import { toast, ToastContainer} from "react-toastify";


export const _changePassword = (password, history) => dispatch => {
    axios
        .put("http://localhost:5000/api/admins/change_password/", password)
        .then(res => {
            if (res.status === 200) {
                toast(res.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
        })
        .catch();
};