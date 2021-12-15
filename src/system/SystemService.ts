import axios, { AxiosResponse } from 'axios';
import { DiskUsageModel } from './entities/DiskUsage';

class SystemService {

    public DiskUsage(): Promise<AxiosResponse<DiskUsageModel>> {
        return axios.get('/system/disk-usage');
    }

}

export default new SystemService();