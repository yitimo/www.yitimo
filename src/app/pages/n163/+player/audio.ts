export class Audio {
    private useBuffer: boolean = false;
    private audioRef: HTMLAudioElement;
    constructor(
        private src?: string,
        private buffer?: AudioBuffer
    ) {
        if (buffer) {
            this.useBuffer = true;
        }
        this.audioRef = window.document.createElement('audio');
    }
}
