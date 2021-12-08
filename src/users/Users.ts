import { Options, Vue } from 'vue-class-component';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { User } from './User';
import UsersService from './UsersService';
import moment from 'moment';
import Checkbox from 'primevue/checkbox';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { AxiosResponse } from 'axios';

@Options({
    components: {
        DataTable,
        Column,
        Checkbox,
        Toolbar,
        Button
    }
})
export default class Users extends Vue {

    public users: User[] = [];
    public isLoading = false;
    public selectedUsers: User[] = [];
    public deleteInProgress = false;

    public mounted(): void {
        this.reload();
    }

    public reload(): void {
        this.isLoading = true;
        UsersService.List()
            .then(r => this.users = [...r.data])
            .finally(() => this.isLoading = false);
    }

    public dateTime(timeStamp: number | null): string {
        if (timeStamp === null)
            return '';

        return moment.unix(timeStamp).format('DD.MM.YYYY HH:mm:ss');
    }

    public openNew(): void {
        this.$router.push({ name: 'UserCreate' });
    }

    public deleteSelected(): void {
        if (this.selectedUsers.length === 0) {
            return;
        }

        this.deleteInProgress = true;
        // eslint-disable-next-line
        const promises: Promise<AxiosResponse<number, any>>[] = [];

        this.selectedUsers.forEach(user => {

            if (user.id != null) {
                const p = UsersService.Delete(user.id);
                promises.push(p);
            }

        });

        Promise.all(promises).finally(() => {
            this.deleteInProgress = false;
            this.selectedUsers = [];
            this.reload();
        });
    }

    public editRow(event: any): void {
        this.$router.push({ name: 'UserCreate' });
    }
}