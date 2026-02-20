import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EndpointStateService } from '../../service/endpoint-state.service';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  private service = inject(EndpointStateService).getEndpointService();

  searchTerm: string = '';

  clearSearch = effect(() => {
    void this.service();
    this.searchTerm = '';
  });

  search() {
    this.service()?.search(this.searchTerm);
  }
}
