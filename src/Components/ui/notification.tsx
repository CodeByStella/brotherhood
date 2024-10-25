import { notification } from "antd"

export const success = (msg: string) => {
  notification.success({
    message: msg, showProgress: true, pauseOnHover: true
  })
}

export const error = (msg: string) => {
  notification.error({
    message: msg, showProgress: true, pauseOnHover: true
  })
}