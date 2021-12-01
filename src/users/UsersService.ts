import axios, { AxiosResponse } from 'axios';
import { User } from '../users/User';

class UsersService {

    public Current(): Promise<AxiosResponse<User>> {
        return axios.get('/users/current');
    }

    public List(): Promise<AxiosResponse<User[]>>{
        return axios.get('/users');
    }
}

export default new UsersService();