import { NgComponentOutlet } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ClickableWidget } from '../../directive/clickable-widget';
import { Model } from '../../model/model';
import { ApiService } from '../../service/api-service';
import { ApiError } from '../api-error/api-error';

@Component({
  selector: 'app-endpoint-list',
  imports: [MatPaginator, ApiError, NgComponentOutlet, ClickableWidget],
  templateUrl: './endpoint-list.html',
  styleUrl: './endpoint-list.css',
  host: {
    '(document:keydown.escape)': 'closeDetail()'
  }
})
export class EndpointList {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);

  private readonly endpointMapping = toSignal(
    this.route.data.pipe(map((data) => data['endpoint'])),
  );

  service = signal<ApiService<Model>>(this.injector.get(this.endpointMapping().service));
  widget = computed(() => this.endpointMapping().widget);
  detail = computed(() => this.endpointMapping().detail);

  error = computed(() => this.service().hasError());
  pageIndex = computed(() => this.service().pageIndex());
  count = computed(() => this.service().count());
  results = computed(() => this.service().results());

  selected = signal<Model | null>(null);

  constructor() {
    effect(() => {
      const { service } = this.endpointMapping();
      this.service.set(this.injector.get(service));
      this.service().load();
    });
  }

  onPageChange(event: PageEvent) {
    this.service().handlePageChange(event, this.paginator);
  }

  onSelected(result: any) {
    this.selected.set(result);
  }

  closeDetail() {
    this.selected.set(null);
  }
}
