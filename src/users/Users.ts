import { Options, Vue } from 'vue-class-component';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { User } from './User';
import UsersService from './UsersService';
import Checkbox from 'primevue/checkbox';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import store from '../store';
import { DateTime } from 'luxon';

@Options({
    components: {
        DataTable,
        Column,
        Checkbox,
        Toolbar,
        Button,
        Dialog
    },
    computed: {
        isAdmin: {
            get(): boolean {
                const currentUser = store.getters['login/getCurrentUser'];

                if (currentUser && currentUser.isAdmin) {
                    return true;
                }
                return false;
            }
        },
    },
})
export default class Users extends Vue {

    public users: User[] = [];
    public isLoading = false;
    public selectedUser: User | undefined = undefined;
    public deleteUsersDialog = false;

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

        return DateTime.fromSeconds(timeStamp).toLocal().toFormat('dd.MM.yyyy HH:mm:ss');
    }

    public openNew(): void {
        this.$router.push({ name: 'UserCreate' });
    }

    public editUser(data: User): void {
        this.$router.push({ name: 'UserEdit', params: { id: data.id } });
    }

    public confirmDeleteUser(user: User): void {
        this.selectedUser = user;
        this.deleteUsersDialog = true;
    }

    public deleteUser(): void {
        if (this.selectedUser && this.selectedUser.id) {
            this.isLoading = true;
            UsersService.Delete(this.selectedUser.id).finally(() => {
                this.reload();
                this.selectedUser = undefined;
                this.deleteUsersDialog = false;
            });
        }
    }
}