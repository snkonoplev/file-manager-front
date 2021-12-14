import axios, { AxiosResponse } from 'axios';
import { LoginResponseModel } from '../models/LoginResponse';
import { LoginModel } from '../models/Login';

class LoginService {

    public Login(model: LoginModel): Promise<AxiosResponse<LoginResponseModel>> {
        return axios.post('/login', model);
    }

    public SetCookie(): Promise<void> {
        return axios.get('/set-cookie');
    }

}

export default new LoginService();