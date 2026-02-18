import { HttpClient } from '@angular/common/http';
import { computed, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { catchError, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { API_BASE_URL } from '../../tokens';
import { ApiResponse, EMPTY_API_RESPONSE } from '../model/api-response';
import { Model } from '../model/model';

export abstract class ApiService<T extends Model> {
  protected apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient);
  protected loadTrigger = new Subject<number>();
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

  loading = signal<boolean>(false);

  constructor() {
    this.loadTrigger
      .pipe(
        tap((pageIndex) => {
          this.setPage(pageIndex);
          this.hasError.set(false);
          this.loading.set(true);
        }),
        switchMap(() => {
          if (this.pageCache.has(this.pageIndex())) {
            this.lastSuccessfulPage.set(this.pageIndex());
            return of(this.pageCache.get(this.pageIndex())!);
          }

          return this.http
            .get<ApiResponse<T>>(`${this.apiUrl}/${this.endpoint}`, {
              params: {
                page: `${this.pageIndex() + 1}`,
              },
            })
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
      .subscribe((response) => {
        this._response.set(response);
        this.loading.set(false);
      });
  }
  load(pageIndex: number = 0): void {
    this.loadTrigger.next(pageIndex);
  }

  setPage(page: number) {
    this.pageIndex.set(page);
  }

  get(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  handlePageChange(event: PageEvent): void {
    this.load(event.pageIndex);
  }
}
