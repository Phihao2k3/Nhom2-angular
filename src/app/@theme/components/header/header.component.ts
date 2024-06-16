import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutService } from '../../../@core/services/common/layout.service';
import { AuthService } from 'app/@core/services/apis';

import { LocalStorageService } from 'app/@core/services/common';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from 'app/@core/config';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private storageService: LocalStorageService,
    private router: Router

  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.user = { name: 'Alibaba', picture: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474114AbO/hinh-anh-jack-dep-trai-cute-dang-yeu-nhat-2021_013741456.jpg' }
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    this.menuService.onItemClick().pipe(takeUntil(this.destroy$)).subscribe((event) => this.onMenuItemClick(event.item.title));
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }


  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onMenuItemClick(title: string) {
    if (title === 'Profile') {
      this.router.navigate(['/pages/profile'], {}).then();
    }else if( title === 'Log out'){
      this.storageService.removeItem(LOCALSTORAGE_KEY.token);
      this.router.navigate([''], {}).then();
    }
  }
}
