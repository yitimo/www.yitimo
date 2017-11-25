export interface LyricPiece {
    lrc: string;
    time: [number, number];
}

export class Lyric {
    public Lyric: LyricPiece[];
    constructor(
        private source: string
    ) {
        this.parseSource();
        console.log(this.Lyric);
    }
    private parseSource() {
        this.Lyric = [];
        let tmpStr = this.source;
        while(tmpStr.length) {
            // 取出第一段时间
            let findTime = tmpStr.match(/\[[0-9]+\:[0-9]+\.[0-9]+\]/);
            if (!findTime) {
                // 不再有时间则解析结束
                let lrcList = tmpStr.split('&yitimo&');
                for (let i = 0; i < this.Lyric.length; i++) {
                    this.Lyric[i].lrc = lrcList[i];
                }
                return;
            }
            let timePart = findTime[0].slice(1, findTime[0].length - 1);
            let firstSplit = timePart.split(':');
            let secondSplit = firstSplit[1].split('.');
            this.Lyric.push({
                lrc: '',
                time: [parseInt(firstSplit[0]) || 0, parseInt(secondSplit[0]) || 0, parseInt(secondSplit[1]) || 0]
            });
            tmpStr = tmpStr.replace(findTime[0], '&yitimo&');
        }
    }
}
