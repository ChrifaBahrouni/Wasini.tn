import axios from "axios";
import { toast, ToastContainer} from "react-toastify";


export const SendMessage = (notificationUserData, history) => dispatch => {
    axios
        .post("/api/notifications/create-notif", notificationUserData)
        .then(res => {
            if (res.status === 200) {
                toast(res.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    message: 'This event is declined',
                })
            }
        })
        .catch();
};

