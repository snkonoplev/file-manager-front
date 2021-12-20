import axios, { AxiosResponse } from 'axios';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';

class StorageService {

    public GetDirectoryContent(path: string | undefined): Promise<AxiosResponse<DirectoryDataWrapper[]>> {
        return axios.get('/storage', { params: { path: path } });
    }
    
}

export default new StorageService();