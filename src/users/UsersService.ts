import axios, { AxiosResponse } from 'axios';
import { User } from '../users/User';
import { ChangePassword } from './ChangePassword';

class UsersService {

    public Current(): Promise<AxiosResponse<User>> {
        return axios.get('/users/current');
    }

    public List(): Promise<AxiosResponse<User[]>> {
        return axios.get('/users');
    }

    public Create(user: User): Promise<AxiosResponse<number>> {
        return axios.post('/users', { ...user });
    }

    public Delete(id: number): Promise<AxiosResponse<number>> {
        return axios.delete(`/users/${id}`);
    }

    public User(id: number): Promise<AxiosResponse<User>> {
        return axios.get(`/users/${id}`);
    }

    public Edit(user: User): Promise<AxiosResponse<number>> {
        return axios.put('/users', { ...user });
    }

    public ChangePassword(model: ChangePassword): Promise<AxiosResponse<number>> {
        return axios.put('/users/change-password', { ...model });
    }
}

export default new UsersService();