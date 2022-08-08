import React from "react"
import {toast} from "react-toastify"
import loginUtils from "./loginUtils"

class RequestUtils {
    async request(method, url, onError401 = () => undefined, authorized = false, body = undefined) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        if (authorized)
            headers['Authorization'] = `Token ${loginUtils.getToken()}`

        try {
            const resp = await fetch(url, {
                method,
                headers,
                body: body !== undefined ? JSON.stringify(body) : undefined,
            })
            if (resp.status >= 300) {
                switch (resp.status) {
                    case 400:
                        const errors = (await resp.json()).map(e => (<><span>{e}</span><br/></>))
                        toast.error(<>{errors}</>)
                        break
                    case 401:
                        toast.error("لاگین نیستید!", {toastId: "Not logged in"})
                        onError401()
                        break
                    default:
                        toast.error(`خطا! (کد ${resp.status})`)
                        break
                }
            }
            return resp
        } catch (e) {
            toast.error("عدم ارتباط با سرور!", {toastId: "No server connection"})
            console.log(e)
            return {
                status: -1,
                text: async () => "عدم ارتباط با سرور!",
                json: async () => ({}),
            }
        }
    }

    async get(url, onError401 = () => undefined, authorized = true) {
        return await this.request('GET', url, onError401, authorized, undefined)
    }

    async post(url, body = {}, onError401 = () => undefined, authorized = true) {
        return await this.request('POST', url, onError401, authorized, body)
    }

    async put(url, body = {}, onError401 = () => undefined) {
        return await this.request('PUT', url, onError401, true, body)
    }

    async delete(url, onError401 = () => undefined) {
        return this.request('DELETE', url, onError401, true)
    }
}

const requestUtils = new RequestUtils()
export default requestUtils
