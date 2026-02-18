import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dropdown-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dropdown-nav.html',
  styleUrl: './dropdown-nav.css',
  host: {'(mouseleave)': 'closeMenu()'}
})
export class DropdownNav {
  open: boolean = false;

  menuItems = [
    { label: "Characters", path: "/character" },
    { label: "Locations", path: "/location" },
    { label: "Episodes", path: "/episode" }
  ];

  toggleMenu() {
    this.open = !this.open;
  }

  closeMenu() {
    this.open = false;
  }
}
