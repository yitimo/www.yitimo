import { Component, OnInit } from '@angular/core';
import { StudioService, TONES } from '../studio.service';

@Component({
    selector: 'tone-matrix',
    templateUrl: './matrix.component.html',
    styleUrls: ['./matrix.component.css']
})
export class ToneMatrixComponent implements OnInit {
    // [音调 c1~d3 39~65, 时间 1/16 s]
    public matrixSize: number[][] = [];
    public matrixState: Array<'on' | 'off' | 'play'>;
    public matrixList: string[][] = [];

    constructor(
        private studio: StudioService
    ) {
        // 得到 16 * 16 的音调矩阵和音调开关 通过索引对应
        for (let i = 0; i < 16; i++) {
            this.matrixSize.push([
                39, 41, 44, 46, 48, 51, 53,
                56, 58, 60, 63, 65,
                70, 72, 75
            ]);
            this.matrixList.push(['off', 'off', 'off', 'off', 'off', 'off', 'off', 'off',
            'off', 'off', 'off', 'off', 'off', 'off', 'off', 'off']);
        }
    }

    public ngOnInit() {
        let i = 0;
        setInterval(() => {
            for (let j = 0; j < 16; j ++) {
                if (this.matrixList[i][j] && this.matrixList[i][j] === 'on') {
                    this.studio.makeSound(TONES.find((t) => t.base === this.matrixSize[0][j]).frequency, 'sine');
                    console.log(`播放【j: ${i}】【i: ${j}】上的音调【${this.matrixSize[i][j]}】`);
                }
            }
            i = (i + 1) > 15 ? 0 : (i + 1);
        }, 125);
    }
    // 5 6 1 2 3 5 6 1 2 3
    public activate(i: number, j: number) {
        this.matrixList[i][j] = this.matrixList[i][j] === 'on' ? 'off' : 'on';
    }
}
