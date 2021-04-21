import {instance,ResponseType} from './api'

export type LoginDataType ={
  email:string
  password:string
  rememberMe:boolean
}
type AuthType = {
  id:number
  email:string
  login:string
}
export const authAPI = {
  login(data:LoginDataType) {
    return instance.post<ResponseType<{}>>('auth/login',{...data}).then(r=>r.data)
  },
  me(){
    return instance.get<ResponseType<AuthType>>('auth/me').then(r=>r.data)
  },
  logOut(){
    return instance.delete('auth/login')
  }

}
