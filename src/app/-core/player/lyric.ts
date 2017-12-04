export interface LyricPiece {
    lrc: string;
    time: number;
}

export class Lyric {
    public Lyric: LyricPiece[];
    constructor(
        private source: string
    ) {
        this.parseSource();
    }
    private parseSource() {
        this.Lyric = [];
        let strPiece = this.source.split('\n');
        for (let item of strPiece) {
            // 取出所有时间头部
            let timeMatch = item.match(/\[[0-9]+\:[0-9]+\.[0-9]+\]+/g);
            if (!timeMatch || !timeMatch.length) {
                continue;
            }
            // 时间部分列表 不含[]包围
            let timeParts = item.slice(1, timeMatch.join('').length).split('][');
            // 歌词部分
            let strPart = item.slice(timeMatch.join('').length, item.length);
            for (let time of timeParts) {
                let firstSplit = time.split(':');
                let secondSplit = firstSplit[1].split('.');
                this.Lyric.push({
                    lrc: strPart,
                    time: 60 * (parseInt(firstSplit[0], 0) || 0) + (parseFloat(firstSplit[1]) || 0)
                });
            }
        }
        this.Lyric.sort((prev, next) => prev.time - next.time);
    }
}
