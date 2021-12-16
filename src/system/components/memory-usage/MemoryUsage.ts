import { Options, Vue } from 'vue-class-component';
import ProgressBar from 'primevue/progressbar';
import { MemoryUsageModel } from '@/system/entities/MemoryUsage';
import SystemService from '@/system/SystemService';
import Card from 'primevue/card';
import prettyBytes from 'pretty-bytes';
import Button from 'primevue/button';

@Options({
    components: {
        ProgressBar,
        Card,
        Button
    },
})
export default class MemoryUsage extends Vue {

    public usage: MemoryUsageModel = {};
    public loading = false;

    public get usedPercent(): number {

        if (this.usage.total && this.usage.used) {
            const usage = 100 - (((this.usage.total - this.usage.used) / this.usage.total) * 100);
            return Math.round(usage * 100) / 100;
        }

        return 0;
    }

    public get total(): string {

        if (this.usage.total) {
            return prettyBytes(this.usage.total);
        }

        return 'NaN';
    }

    public get used(): string {

        if (this.usage.used) {
            return prettyBytes(this.usage.used);
        }

        return 'NaN';
    }

    public get available(): string {

        if (this.usage.available) {
            return prettyBytes(this.usage.available);
        }

        return 'NaN';
    }

    public get cached(): string {

        if (this.usage.cached) {
            return prettyBytes(this.usage.cached);
        }

        return 'NaN';
    }

    public get free(): string {

        if (this.usage.free) {
            return prettyBytes(this.usage.free);
        }

        return 'NaN';
    }

    public get mode(): string {

        if (this.loading) {
            return 'indeterminate';
        }

        return 'determinate';

    }

    public mounted(): void {
        this.refresh();
    }

    public refresh(): void {
        this.loading = true;
        SystemService.MemoryUsage().then(r => {
            this.usage = { ...r.data };
            this.loading = false;
        });
    }
}