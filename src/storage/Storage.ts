import { Options, Vue } from 'vue-class-component';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import StorageService from './StorageService';
import { DirectoryDataWrapper } from './entities/DirectoryDataWrapper';
import prettyBytes from 'pretty-bytes';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import store from '../store';
import { useCookies } from "vue3-cookies";

@Options({
    components: {
        TreeTable,
        Column,
        Button,
        Toolbar,
        Dialog,
        FileUpload,
        Dropdown,
        InputText
    },
})
export default class Storage extends Vue {
    public nodes: DirectoryDataWrapper[] = [];
    public loading = false;
    public expandedKeys = {};
    public cookies = useCookies();
    public showUploadDialog = false;
    public showMkDirDialog = false;
    public selectedFolder = null;
    public folderToCreate = null;

    public get foldersList(): string[] {

        let list = ["."];

        this.nodes.forEach(n => {
            const l = this.getFoldersList(n, null);
            if (n.key && n.data?.type == 'Folder')
                list = [...list, n.key, ...l];
        });

        return list;
    }

    public prettyBytes(value?: number, type?: string): string {

        if (type === "Folder") {
            return "";
        }

        if (!value) {
            return "NaN";
        }

        return prettyBytes(value);
    }

    public onDownload(node: DirectoryDataWrapper): void {
        if (node.key && node.data && node.data?.name) {
            const token = store.getters['login/getToken'] as string | undefined;
            const expires = store.getters['login/getExpire'] as number | undefined;
            const url = process.env.NODE_ENV === 'development' ? `http://localhost:5000/api/storage/download/${node.key}` : `/api/storage/download/${node.key}`;
            if (token && expires && expires > new Date().valueOf()) {
                this.cookies.cookies.set('jwt', token, new Date(expires), '/api/storage/download');
                window.open(url, '_blank');
            } else {
                window.location.reload();
            }
        }
    }

    public onExpand(node: DirectoryDataWrapper): void {
        StorageService.GetDirectoryContent(node.key)
            .then(r => {
                const data = [...r.data];
                const nodes = this.nodes.map(n => {
                    const result = this.checkNode(node.key, n);

                    if (result) {
                        result.children = data;
                    }

                    return n;
                });

                this.nodes = [...nodes];
            })
            .finally(() => this.loading = false);
    }

    public onDelete(node: DirectoryDataWrapper): void {
        if (!node.key)
            return;

        this.loading = true;
        StorageService.Delete(node.key)
            .then(() => this.removeNode(node, undefined))
            .finally(() => this.loading = false);
    }

    public openUploadDialog(): void {
        this.showUploadDialog = true;
    }

    public closeUploadDialog(): void {
        this.showUploadDialog = false;
    }

    public openMkDirDialog(): void {
        this.showMkDirDialog = true;
    }

    public closeMkDirDialog(): void {
        this.showMkDirDialog = false;
    }

    // eslint-disable-next-line
    public uploader(event: any): void {
        if (this.selectedFolder) {
            const loader = this.$loading.show();
            const form = new FormData();
            form.append('path', this.selectedFolder ?? "");

            for (let i = 0; i < event.files.length; i++) {
                form.append(event.files[i].name, event.files[i])
            }

            StorageService.Upload(form)
                .then(() => this.reLoad())
                .finally(() => {
                    this.showUploadDialog = false;
                    this.selectedFolder = null;
                    loader.hide();
                });
        } else {
            this.showUploadDialog = false;
            this.selectedFolder = null;
        }
    }

    public makeDirectory(): void {

        if (this.folderToCreate && this.selectedFolder) {
            const loader = this.$loading.show();
            StorageService
            .MkDir(`${this.selectedFolder}/${this.folderToCreate}`)
            .then(() => this.reLoad())
            .finally(() => loader.hide());
        }

        this.folderToCreate = null;
        this.selectedFolder = null;
        this.closeMkDirDialog();
    }

    public reLoad(): void {
        this.loading = true;
        StorageService.GetDirectoryContent(undefined)
            .then(r => this.nodes = [...r.data])
            .finally(() => this.loading = false);
    }

    public mounted(): void {        
        this.reLoad();
    }

    private checkNode(nodeKey: string | undefined, node: DirectoryDataWrapper): DirectoryDataWrapper | void {
        if (node.key === nodeKey) {
            return node;
        }

        if (node.children) {

            let newNode: DirectoryDataWrapper | undefined = undefined;

            for (let j = 0; j < node.children.length; j++) {
                const n = this.checkNode(nodeKey, node.children[j]);
                if (n) {
                    newNode = n;
                    break;
                }
            }

            return newNode;
        }
    }

    private removeNode(node: DirectoryDataWrapper, children: DirectoryDataWrapper[] | undefined): void {

        let nodes = this.nodes;

        if (children) {
            nodes = children;
        }

        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];

            if (n.key === node.key) {
                nodes.splice(i, 1);
                break;
            }

            if (n.children && n.children.length > 0)
                this.removeNode(node, n.children);
        }
    }

    private getFoldersList(node: DirectoryDataWrapper, list: string[] | null): string[] {

        if (!list)
            list = [];

        if (node.children) {
            for (let j = 0; j < node.children.length; j++) {
                const n = node.children[j];

                if (n.key && n.data?.type === 'Folder')
                    list.push(n.key);

                if (n.children && n.children.length > 0) {
                    this.getFoldersList(n, list);
                }

            }
        }

        return list;
    }
}