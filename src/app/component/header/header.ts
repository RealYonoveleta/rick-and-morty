import { Component } from '@angular/core';
import { DropdownNav } from '../dropdown-nav/dropdown-nav';
import { SearchBar } from "../search-bar/search-bar";

@Component({
  selector: 'app-header',
  imports: [DropdownNav, SearchBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
