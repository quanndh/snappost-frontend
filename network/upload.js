
import { post } from 'axios'
import config from '../constants';
import ApiService from '../services/ApiService/ApiService';

const upload = async (url, data) => {

    url = config.apiHost + url;

    const finalData = new FormData();
    finalData.append(data.type, data.data);

    let token = ApiService.getToken()
    const options = {
        headers: {
            Authorization: "Bearer " + token,
            'content-type': 'multipart/form-data',
        },

        onUploadProgress: progressEvent => {
            ApiService.setCreatePostUploadPercent(Math.ceil(progressEvent.loaded / data.data.size * 100))
        }
    }

    console.log("%c-----------" + "post" + "------------", 'color: green; font-size: 16px')

    try {
        let response = await post(url, finalData, options)
        console.log("%c-----------RESPONSE-----------", 'color: red; font-size: 16px')
        console.log(response)
        if (!response.data.msg) response.data.msg = response.data.code === 0 ? "Mã hợp lệ" : "Mã không hợp lệ"

        if (response.status === 200) {
            return response.data
        }
        if (response.status === 401) {
            apiStore.logout();
        }

    } catch (error) {
        if (error.response) {
            if (error.response.data.code === 401) {
                // apiStore.logout();
            }
            console.log(error.response.data)
        }
        return error.response.data;
    }

}

export default upload;