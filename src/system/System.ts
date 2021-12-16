import { Options, Vue } from 'vue-class-component';
import DiskUsage from './components/disk-usage/DiskUsage.vue';
import MemoryUsage from './components/memory-usage/MemoryUsage.vue';
import CpuUsage from './components/cpu-usage/CpuUsage.vue';
import CommonInfo from './components/common-info/CommonInfo.vue';

@Options({
    components: {
        DiskUsage,
        MemoryUsage,
        CpuUsage,
        CommonInfo
    },
})
export default class System extends Vue {
}