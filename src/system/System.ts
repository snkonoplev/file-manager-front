import { Options, Vue } from 'vue-class-component';
import DiskUsage from './components/disk-usage/DiskUsage.vue';

@Options({
    components: {
        DiskUsage
    },
})
export default class System extends Vue {
}