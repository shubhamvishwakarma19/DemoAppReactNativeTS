// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import { AsyncStorage } from 'react-native';
import { base_url_API, register_Api } from "../Config/api";
import { TIMEOUT } from "../Config/constant";

let accessToken = "";

const create = (baseURL = base_url_API) => {

    const api = apisauce.create({
        baseURL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        // 20 second timeout...
        timeout: TIMEOUT
    })


    const setAuthToken = (token: any, type: any) => {

        if (type == undefined || type == null) {
            type = "application/json"
            console.log(type, "typetypetype------")
        } else {
            console.log(type, "typetypetype---------======-")
            type = "multipart/form-data"
        }

        AsyncStorage.setItem('authtoken', token);
        api.setHeader('Authorization', "Bearer " + token);
        api.setHeader('Content-Type', type);
        // api.defaults.headers.common['Content-Type'] = type;
    }
    /* USER */

    const post_api = (data: { api_name: any, error: any }) => {
        return api.post(data.api_name, data.data).then((response) => {
            console.log(response, "response");
            let data = response;
            if (response.problem != "CLIENT_ERROR") {
                const retval = data;
                return retval;
            } else {
                data.error = true;
                return data;
            }
        }).catch((err) => {
            return err;
        })
    }

    const get_api = (data: { api_name: any, error: any }) => {
        return api.get(data.api_name).then((response) => {
            console.log(response, "response of get_api");
            let data = response;
            if (response.problem != "CLIENT_ERROR") {
                const retval = data;
                return retval;
            } else {
                data.error = true;
                return data;
            }
        }).catch((err) => {
            return err;
        })
    }

    return {
        setAuthToken,
        post_api,
        get_api
    }
}

// let's return back our create method as the default.
export default {
    create
}
