
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";
export const CreateCategory = (categoryData, history) => dispatch => {
    
    axios
        .post("/api/category/create-categorie", categoryData)
        .then(res => {
            if (res.status === 200) {
                toast(res.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                })
            }
           
        })
        .catch();
};