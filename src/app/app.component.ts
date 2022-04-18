import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	@ViewChild("sidenavContainer", { static: false })
	sideNavContainer: MatSidenavContainer;

	ngAfterViewInit() {
		// calling updateContentMargins on next tick, fixes the spacing.
		setTimeout(() => this.sideNavContainer?.updateContentMargins(), 0);
	}

	opened = false;

	@ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

	ngOnInit() {
		console.log(window.innerWidth);
		if (window.innerWidth < 768) {
			this.sidenav.fixedTopGap = 55;
			this.opened = false;
		} else {
			this.sidenav.fixedTopGap = 55;
			this.opened = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (event.target.innerWidth < 768) {
			this.sidenav.fixedTopGap = 55;
			this.opened = false;
		} else {
			this.sidenav.fixedTopGap = 55;
			this.opened = true;
		}
	}

	isBiggerScreen() {
		const width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth;
		if (width < 768) {
			return true;
		} else {
			return false;
		}
	}
}
