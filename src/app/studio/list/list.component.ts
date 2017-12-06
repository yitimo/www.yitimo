import { Component, OnInit } from '@angular/core';
import { StudioService, StudioRouteService } from '../-player';
import { DialogPopupComponent } from '../../-shared';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public playList: any[] = [];
    public currId: number = 0;
    constructor(
        public router: StudioRouteService,
        private studio: StudioService,
        private dialog: MatDialog
    ) {
        this.studio.$init.subscribe(() => {
            this.playList = [];
            this.currId = this.studio.CurrentId();
            for (let id of this.studio.idList) {
                if (this.studio.infoList[id]) {
                    this.playList.push(this.studio.infoList[id]);
                }
            }
        });
        this.studio.Watch().subscribe((res) => {
            this.currId = res;
            this.playList = [];
            for (let id of this.studio.idList) {
                if (this.studio.infoList[id]) {
                    this.playList.push(this.studio.infoList[id]);
                }
            }
        });
    }

    public ngOnInit() {
        //
    }

    public currCheck(id: number): boolean {
        return this.currId === id;
    }

    public doDelete(id: number) {
        let ask = this.dialog.open(DialogPopupComponent, {data: {title: '删除歌曲', msg: '确定要从列表中删除该歌曲吗?', ok: '删除', no: '取消'}});
        ask.afterClosed().subscribe((isOk) => {
            if (isOk) {
                this.studio.Remove(id);
            }
        });
    }

    public doPlay(id: number) {
        if (this.currId !== id) {
            this.studio.Play(id);
        }
    }
}
