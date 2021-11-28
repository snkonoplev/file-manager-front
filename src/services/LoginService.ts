import axios, { AxiosResponse } from 'axios';
import { LoginResponseModel } from '../models/LoginResponse';
import { LoginModel } from '../models/login';

class LoginService {

    public Login(model: LoginModel): Promise<AxiosResponse<LoginResponseModel>> {
        return axios.post('/login', model);
    }

    public Current(): Promise<AxiosResponse<any>> {
        return axios.get('/users/current');
    }
}

export default new LoginService();