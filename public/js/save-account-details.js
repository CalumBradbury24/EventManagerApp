import axios from 'axios';
import { showAlert } from './alerts'

export const updateUserDetails = async (form) => {
    try{
        const res = await axios({
            method: "PATCH",
			url: "http://localhost:5000/api/v1/users/update-profile",
			data: form
        })

        if(res.data.status === 'success') {
            showAlert('success', res.data.message)
            window.setTimeout(() => {
				//After 0.5 seconds re-load page (not really 0.5 seconds tho depending on the callback queue)
                location.reload()
			}, 500);
        }

    } catch (error) {
        console.log(error)
        showAlert('error', error.response.data.message);
    }
}