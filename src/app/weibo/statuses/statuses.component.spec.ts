import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { MdDialog } from '@angular/material';
import {
    async, fakeAsync, tick,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';

describe('Home', () => {
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let de;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: HomeService, useValue: {
                List: () => {
                    return [{text: '有我就够了'}];
                },
                Latest: () => {
                    return new Promise((res) => { res([]); });
                }
            }}, {provide: MdDialog, useValue: {}}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('status-card'));
    });

    it('should have false topTip after ngOnInit', () => {
        comp.ngOnInit();
        expect(comp.topTip).toEqual(false);
    });

    it('should have false bottomTip after ngOnInit', () => {
        comp.ngOnInit();
        expect(comp.bottomTip).toEqual(false);
    });

    it('should have true topTip after pulled', () => {
        comp.pulled('up');
        expect(comp.topTip).toEqual(true);
    });

    it('should have true bottomTip after pulled', () => {
        comp.pulled('down');
        expect(comp.bottomTip).toEqual(true);
    });

    it('should have false topTip again after pulling', () => {
        comp.topTip = true;
        comp.pulling({action: 'up', scroll: 1});
        expect(comp.topTip).toEqual(false);
    });

    it('should have false bottomTip again after pulling', () => {
        comp.bottomTip = true;
        comp.pulling({action: 'down', scroll: 1});
        expect(comp.bottomTip).toEqual(false);
    });
});
