import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactWrapperComponent } from './react-wrapper.component';
import { PLATFORM_ID } from '@angular/core';
import * as React from 'react';
import { act } from 'react-dom/test-utils';

const MockReactComponent = (props: { text: string }) => React.createElement('div', null, props.text);

describe('ReactWrapperComponent', () => {
  let component: ReactWrapperComponent;
  let fixture: ComponentFixture<ReactWrapperComponent>;

  describe('in browser', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactWrapperComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
      }).compileComponents();

      fixture = TestBed.createComponent(ReactWrapperComponent);
      component = fixture.componentInstance;
      component.component = MockReactComponent;
      component.props = { text: 'Hello' };
      // Do NOT call detectChanges here, we'll call it in tests to have better control
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should render react component', async () => {
      component.ngOnChanges({});
      fixture.detectChanges();
      // Wait for React to render
      await new Promise(resolve => setTimeout(resolve, 50));
      const element: HTMLElement = fixture.nativeElement;
      expect(element.innerHTML).toContain('Hello');
    });

    it('should update react component when props change', async () => {
      component.ngOnChanges({});
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      component.props = { text: 'Updated' };
      component.ngOnChanges({
        props: {
          currentValue: { text: 'Updated' },
          previousValue: { text: 'Hello' },
          firstChange: false,
          isFirstChange: () => false
        }
      });
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));
      const element: HTMLElement = fixture.nativeElement;
      expect(element.innerHTML).toContain('Updated');
    });

    it('should unmount on destroy', async () => {
      component.ngOnChanges({});
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const root = (component as any).root;
      expect(root).toBeDefined();
      const spy = vi.spyOn(root, 'unmount');
      fixture.destroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('in server', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactWrapperComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'server' }]
      }).compileComponents();

      fixture = TestBed.createComponent(ReactWrapperComponent);
      component = fixture.componentInstance;
      component.component = MockReactComponent;
      component.props = { text: 'Hello' };
    });

    it('should not render in server platform', () => {
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      expect(element.innerHTML).toBe('');
    });
  });
});
