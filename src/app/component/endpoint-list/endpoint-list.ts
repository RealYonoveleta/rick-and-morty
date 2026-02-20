import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ClickableWidget } from '../../directive/clickable-widget';
import { Model } from '../../model/model';
import { ApiService } from '../../service/api-service';
import { ApiError } from '../api-error/api-error';
import { EndpointStateService } from '../../service/endpoint-state.service';

@Component({
  selector: 'app-endpoint-list',
  imports: [MatPaginator, ApiError, NgComponentOutlet, ClickableWidget],
  templateUrl: './endpoint-list.html',
  styleUrl: './endpoint-list.css',
  host: {
    '(document:keydown.escape)': 'closeDetail()',
  },
})
export class EndpointList {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);
  private readonly endpointStateService = inject(EndpointStateService);

  private readonly endpointMapping = toSignal(
    this.route.data.pipe(map((data) => data['endpoint'])),
  );

  service = signal<ApiService<Model>>(this.injector.get(this.endpointMapping().service));
  widget = computed(() => this.endpointMapping().widget);
  detail = computed(() => this.endpointMapping().detail);

  error = computed(() => this.service().error());
  pageIndex = computed(() => this.service().pageIndex());
  count = computed(() => this.service().count());
  results = computed(() => this.service().results());
  readonly lastSuccessfulPage = computed(() => this.service().lastSuccessfulPage());
  readonly serviceLoading = computed(() => this.service().loading());

  readonly searchTerm = computed(() => this.service().searchTerm());

  selected = signal<Model | null>(null);

  constructor() {
    effect(() => {
      const { service } = this.endpointMapping();
      this.service.set(this.injector.get(service));
    });

    effect(() => {
      const service = this.service();
      this.endpointStateService.setEndpointService(service);      
    });

    effect(() => {
      const loading = this.serviceLoading();
      if (loading || !this.paginator) return;
      this.paginator.pageIndex = this.lastSuccessfulPage();
    });
  }

  onPageChange(event: PageEvent) {
    this.service().setPage(event.pageIndex);
  }

  onSelected(result: any) {
    this.selected.set(result);
  }

  closeDetail() {
    this.selected.set(null);
  }
}
