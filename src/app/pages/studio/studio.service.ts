import { Injectable } from '@angular/core';

export const OscillatorType = {
    SINE: 'sine',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    SAWTOOTH: 'sawtooth'
};

export const KEYMAP = [
    {key: 'a', base: 3},
    {key: 's', base: 5},
    {key: 'd', base: 7},
    {key: 'f', base: 8},
    {key: 'g', base: 10},
    {key: 'h', base: 12},
    {key: 'j', base: 14},

    {key: 'w', base: 4},
    {key: 'e', base: 6},
    {key: 't', base: 9},
    {key: 'y', base: 11},
    {key: 'u', base: 13}
];

export const KEYSKIP = [
    {key: 'z', base: 0},
    {key: 'x', base: 12},
    {key: 'c', base: 24},
    {key: 'v', base: 36},
    {key: 'b', base: 48},
    {key: 'n', base: 60},
    {key: 'm', base: 72}
];

export const TONES: Tone[] = [
    {frequency: 27.5, code: 'A2', base: 0, rising: {frequency: 29.1, code: '#A2', base: 1}},
    {frequency: 30.9, code: 'B2', base: 2},

    {frequency: 32.7, code: 'C1', base: 3, rising: {frequency: 34.6, code: '#C1', base: 4}},
    {frequency: 36.7, code: 'D1', base: 5, rising: {frequency: 38.9, code: '#D1', base: 6}},
    {frequency: 41.2, code: 'E1', base: 7},
    {frequency: 43.9, code: 'F1', base: 8, rising: {frequency: 46.2, code: '#F1', base: 9}},
    {frequency: 49.0, code: 'G1', base: 10, rising: {frequency: 51.9, code: '#G1', base: 11}},
    {frequency: 55.0, code: 'A1', base: 12, rising: {frequency: 58.3, code: '#A1', base: 13}},
    {frequency: 61.7, code: 'B1', base: 14},

    {frequency: 65.4, code: 'C', base: 15, rising: {frequency: 69.3, code: '#C', base: 16}},
    {frequency: 73.4, code: 'D', base: 17, rising: {frequency: 77.8, code: '#D', base: 18}},
    {frequency: 82.4, code: 'E', base: 19},
    {frequency: 87.3, code: 'F', base: 20, rising: {frequency: 92.5, code: '#F', base: 21}},
    {frequency: 98.0, code: 'G', base: 22, rising: {frequency: 103.8, code: '#G', base: 23}},
    {frequency: 110.0, code: 'A', base: 24, rising: {frequency: 116.5, code: '#A', base: 25}},
    {frequency: 123.5, code: 'B', base: 26},

    {frequency: 130.8, code: 'c', simple: '<1', base: 27, rising: {frequency: 138.6, code: '#c', base: 28}},
    {frequency: 146.8, code: 'd', simple: '<2', base: 29, rising: {frequency: 155.6, code: '#d', base: 30}},
    {frequency: 164.8, code: 'e', simple: '<3', base: 31},
    {frequency: 174.6, code: 'f', simple: '<4', base: 32, rising: {frequency: 185.0, code: '#f', base: 33}},
    {frequency: 196.0, code: 'g', simple: '<5', base: 34, rising: {frequency: 207.7, code: '#g', base: 35}},
    {frequency: 220.0, code: 'a', simple: '<6', base: 36, rising: {frequency: 233.1, code: '#a', base: 37}},
    {frequency: 246.9, code: 'b', simple: '<7', base: 38},

    {frequency: 261.6, code: 'c1', simple: '1', base: 39, rising: {frequency: 277.2, code: '#c1', base: 40}},
    {frequency: 293.7, code: 'd1', simple: '2', base: 41, rising: {frequency: 311.1, code: '#d1', base: 42}},
    {frequency: 329.6, code: 'e1', simple: '3', base: 43},
    {frequency: 349.2, code: 'f1', simple: '4', base: 44, rising: {frequency: 370.0, code: '#f1', base: 45}},
    {frequency: 392.0, code: 'g1', simple: '5', base: 46, rising: {frequency: 415.3, code: '#g1', base: 47}},
    {frequency: 440.0, code: 'a1', simple: '6', base: 48, rising: {frequency: 466.2, code: '#a1', base: 49}},
    {frequency: 493.9, code: 'b1', simple: '7', base: 50},

    {frequency: 523.3, code: 'c2', simple: '>1', base: 51, rising: {frequency: 554.4, code: '#c2', base: 52}},
    {frequency: 587.3, code: 'd2', simple: '>2', base: 53, rising: {frequency: 622.3, code: '#d2', base: 54}},
    {frequency: 659.3, code: 'e2', simple: '>3', base: 55},
    {frequency: 698.5, code: 'f2', simple: '>4', base: 56, rising: {frequency: 740.0, code: '#f2', base: 57}},
    {frequency: 784.0, code: 'g2', simple: '>5', base: 58, rising: {frequency: 830.6, code: '#g2', base: 59}},
    {frequency: 880.0, code: 'a2', simple: '>6', base: 60, rising: {frequency: 932.3, code: '#a2', base: 61}},
    {frequency: 987.8, code: 'b2', simple: '>7', base: 62},

    {frequency: 1047, code: 'c3', base: 63, rising: {frequency: 1109, code: '#c3', base: 64}},
    {frequency: 1175, code: 'd3', base: 65, rising: {frequency: 1245, code: '#d3', base: 66}},
    {frequency: 1319, code: 'e3', base: 67},
    {frequency: 1397, code: 'f3', base: 68, rising: {frequency: 1480, code: '#f3', base: 69}},
    {frequency: 1568, code: 'g3', base: 70, rising: {frequency: 1661, code: '#g3', base: 71}},
    {frequency: 1760, code: 'a3', base: 72, rising: {frequency: 1865, code: '#a3', base: 73}},
    {frequency: 1976, code: 'b3', base: 74},
    {frequency: 2093, code: 'c4', base: 75, rising: {frequency: 2217, code: '#c4', base: 76}},

    {frequency: 2349, code: 'd4', base: 77, rising: {frequency: 2489, code: '#d4', base: 78}},
    {frequency: 2637, code: 'e4', base: 79},
    {frequency: 2794, code: 'f4', base: 80, rising: {frequency: 2960, code: '#f4', base: 81}},
    {frequency: 3136, code: 'g4', base: 82, rising: {frequency: 3322, code: '#g4', base: 83}},
    {frequency: 3520, code: 'a4', base: 84, rising: {frequency: 3729, code: '#a4', base: 85}},
    {frequency: 3951, code: 'b4', base: 86},

    {frequency: 4186, code: 'c5', base: 87},
    {frequency: 0, code: '0', base: 88} // 作为空拍
];

@Injectable()
export class StudioService {
    private audioContext: AudioContext;
    private playInterval: any;
    constructor() {
        this.audioContext = new AudioContext();
    }
    /**
     * @param book 输入乐谱 字符串形式 1~7表示哆到西 >前缀表示高音 <前缀表示低音 空格表示空拍
     * @param beat 播放音调的间隔 即节拍 值为每1秒的次数 即1代表每秒1拍
     */
    public play(book: string, beat?: number) {
        let begin = 0;
        this.playInterval = setInterval(() => {
            let next;
            switch (book[begin]) {
                case undefined:
                clearInterval(this.playInterval);
                return;
                case '>':
                next = TONES.find((tone) => tone.simple === `>${book[begin + 1]}`) || {frequency: 0};
                this.makeSound(next.frequency, 'sine');
                begin += 2;
                return;
                case '<':
                next = TONES.find((tone) => tone.simple === `<${book[begin + 1]}`) || {frequency: 0};
                this.makeSound(next.frequency, 'sine');
                begin += 2;
                return;
                case ' ':
                default:
                next = TONES.find((tone) => tone.simple === book[begin]) || {frequency: 0};
                this.makeSound(next.frequency, 'sine');
                begin ++;
                return;
            }
        }, (1 / (beat || 1)) * 1000);
    }
    public makeSound(frequency: number, oscillatorType: string) {
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        let oscillator = this.audioContext.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        let gainNode = this.audioContext.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = <any> oscillatorType;
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = frequency;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioContext.currentTime);
        // 1秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1);
        // 1秒后完全停止声音
        oscillator.stop(this.audioContext.currentTime + 1);
    }
}

export interface Tone {
    frequency: number; // 实际决定音调的数值
    code: string; // 用于表现的音符
    base: number; // 基数 对应钢琴88键的87个索引
    simple?: string;
    rising?: Tone;
}
