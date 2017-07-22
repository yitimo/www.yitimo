import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const ytmFly: AnimationEntryMetadata = trigger('ytmFly', [
    transition('* => top', [
        style({
            opacity: 0,
            transition: 'linear',
            transform: 'translateY(-100%)'
        }),
        animate('0.3s linear')
    ]),
    transition('top => *', [
        animate('0.3s linear',
        style({
            opacity: 0,
            transition: 'linear',
            transform: 'translateY(-100%)'
        }))
    ]),
    transition('* => bottom', [
        style({
            position: 'fixed',
            transition: 'linear',
            transform: 'translateY(100%)'
        }),
        animate('0.3s linear')
    ]),
    transition('bottom => void', [
        animate('0.3s linear',
        style({
            position: 'fixed',
            transition: 'linear',
            transform: 'translateY(100%)'
        }))
    ]),
    transition('* => right', [
        style({
            transition: 'linear',
            transform: 'translateX(100%)'
        }),
        animate('0.5s linear')
    ]),
    transition('right => void', [
        animate('0.5s linear',
        style({
            transition: 'linear',
            transform: 'translateX(-100%)'
        }))
    ])
]);
