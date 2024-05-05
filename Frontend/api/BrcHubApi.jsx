import axios from "axios";

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const baseUrl = "http://localhost:8087";
const instance = axios.create();

/**
 * 
 * @author shivanand
 */
export class BrcHubApi {

    static getInstance() {
        return instance;
    }

    static async signUp(formData, after) {
        try {
            const res = await instance.post(baseUrl + '/signup', formData);
            if (res.status == 200) {
                after(res);
            } else {
                console.error(res.data);
            }
            
        } catch (err) {
            console.log(err.response.data);
            // after(err);
        }
    };

    static async sendVerificationMail(formData, after) {
        try {
            const res = await instance.post(baseUrl + '/send/verify/mail', formData);
            if (res.status == 200) {
                after(res);
            } else {
                console.error(res.data);
            }
            
        } catch (err) {
            console.log(err.response.data);
            // after(err);
        }
    };

    static async signIn(formData, after) {
        try {
            const res = await instance.post(baseUrl + '/signin', formData);
            if (res.status == 200) {
                after(res);
            } else {
                console.error(res.data);
            }
            
        } catch (err) {
            console.log(err.response.data);
            // after(err);
        }
    };
}
