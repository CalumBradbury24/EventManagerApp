import axios from 'axios';
import { showAlert } from './alerts'

export const updateUserDetails = async (fn, ln, em, cn, addr, cty, st, pc, cntry) => {
    try{
        const res = await axios({
            method: "POST",
			url: "http://localhost:5000/api/v1/users/update-profile",
			data: {
                fname: fn,
                lname: ln,
				email: em,
                contactNumber: cn,
                address: addr,
                city: cty,
                state: st,
                postcode: pc,
                country: cntry,
			},
        })

        if(res.data.status === 'success') {
            showAlert('success', res.data.message)
            window.setTimeout(() => {
				//After 0.5 seconds load landing page
                location.reload()
			}, 500);
        }

    } catch (error) {
        console.log(error)
        showAlert('error', 'Error updating details! Please try again.');
    }
}