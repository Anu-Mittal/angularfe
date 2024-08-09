import { Component, NgZone, OnInit } from '@angular/core';
import { NextConfig } from "../../app-config";
import { Location } from '@angular/common';
import { NgClass } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass,NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  public nextConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor(private zone: NgZone, private location: Location) {
    this.nextConfig = NextConfig.config;
    
    let currentURL: string = this.location.path();

    // Safely retrieve baseHref using Angular's APP_BASE_HREF if needed
    const baseHref: string = (this.location as any)['_baseHref'] || '';

    if (baseHref) {
        currentURL = baseHref + currentURL;
    }

    this.windowWidth = window.innerWidth;

    if (
        currentURL === baseHref + '/layout/collapse-menu' ||
        currentURL === baseHref + '/layout/box' ||
        (this.windowWidth >= 992 && this.windowWidth <= 1024)
    ) {
        this.nextConfig.collapseMenu = true;
    }

    this.navCollapsed = this.windowWidth >= 992 ? this.nextConfig.collapseMenu : false;
    this.navCollapsedMob = false;
}

  ngOnInit() {
    if (this.windowWidth < 992) {
      this.nextConfig.layout = 'vertical';
      setTimeout(() => {
        const navbar = document.querySelector('.pcoded-navbar')
        if(navbar){
          navbar.classList.add('menupos-static');
        }
        (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = '100%'; // 100% amit
      }, 500);
    }
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      const pcoded_navbar =  document.querySelector('app-navigation.pcoded-navbar')
      if (this.navCollapsedMob && !(pcoded_navbar?.classList.contains('mob-open'))) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

}
