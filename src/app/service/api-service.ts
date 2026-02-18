import { computed, inject, signal } from '@angular/core';
import { API_BASE_URL } from '../../tokens';
import { catchError, Observable, of, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, EMPTY_API_RESPONSE } from '../model/api-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Model } from '../model/model';

export abstract class ApiService<T extends Model> {
  protected apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient);
  protected loadTrigger = new Subject<void>();
  private _response = signal<ApiResponse<T>>(EMPTY_API_RESPONSE);
  readonly response = this._response.asReadonly();

  protected abstract readonly endpoint: string;

  readonly results = computed(() => this.response().results);
  readonly info = computed(() => this.response().info);
  readonly count = computed(() => this.info().count);
  readonly pages = computed(() => this.info().pages);

  readonly pageIndex = signal(0);
  readonly pageSize = signal(20);

  private pageCache = new Map<number, ApiResponse<T>>();
  readonly lastSuccessfulPage = signal(0);
  readonly hasError = signal(false);

  constructor() {
    this.loadTrigger
      .pipe(
        throttleTime(300),
        switchMap(() => {
          this.hasError.set(false);

          if (this.pageCache.has(this.pageIndex())) {
            this.lastSuccessfulPage.set(this.pageIndex());
            return of(this.pageCache.get(this.pageIndex())!);
          }

          return this.http
            .get<ApiResponse<T>>(`${this.apiUrl}/${this.endpoint}?page=${this.pageIndex() + 1}`)
            .pipe(
              tap((response) => {
                this.pageCache.set(this.pageIndex(), response);
                this.lastSuccessfulPage.set(this.pageIndex());
              }),
              catchError((error) => {
                console.warn('Error fetching data:', error);
                this.pageIndex.set(this.lastSuccessfulPage());
                this.hasError.set(true);
                return of(this._response());
              }),
            );
        }),
      )
      .subscribe((response) => this._response.set(response));
  }
  load(): void {
    this.loadTrigger.next();
  }

  setPage(page: number) {
    this.pageIndex.set(page);
  }

  get(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  handlePageChange(event: PageEvent, paginator: MatPaginator): void {
    this.setPage(event.pageIndex);
    this.load();

    paginator.pageIndex = this.lastSuccessfulPage();
  }
}
