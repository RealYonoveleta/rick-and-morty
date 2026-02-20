import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { API_BASE_URL } from '../../tokens';
import { ApiResponse, EMPTY_API_RESPONSE } from '../model/api-response';
import { Model } from '../model/model';

export abstract class ApiService<T extends Model> {
  protected apiUrl = inject(API_BASE_URL);
  private http = inject(HttpClient);
  private _response = signal<ApiResponse<T>>(EMPTY_API_RESPONSE);
  readonly response = this._response.asReadonly();

  protected abstract readonly endpoint: string;

  readonly results = computed(() => this.response().results);
  readonly info = computed(() => this.response().info);
  readonly count = computed(() => this.info().count);
  readonly pages = computed(() => this.info().pages);

  readonly pageIndex = signal(0);
  private page$ = toObservable(this.pageIndex);

  private pageCache = new Map<string, ApiResponse<T>>();
  readonly lastSuccessfulPage = signal(0);
  readonly error = signal<HttpErrorResponse | null>(null);

  loading = signal<boolean>(false);

  searchTerm = signal<string>('');
  private searchTerm$ = toObservable(this.searchTerm);

  constructor() {
    combineLatest([this.page$, this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged())])
      .pipe(
        switchMap(([page, searchTerm]) => {
          const cacheKey = `${page}-${searchTerm}`;

          this.loading.set(true);
          this.error.set(null);

          if (this.pageCache.has(cacheKey)) {
            this.lastSuccessfulPage.set(page);
            return of(this.pageCache.get(cacheKey)!);
          }

          return this.http
            .get<ApiResponse<T>>(`${this.apiUrl}/${this.endpoint}`, {
              params: {
                page: `${page + 1}`,
                name: searchTerm,
              },
            })
            .pipe(
              tap((response) => {
                this.pageCache.set(cacheKey, response);
                this.lastSuccessfulPage.set(page);
              }),
              catchError((error) => {
                console.warn('Error fetching data:', error);
                this.pageIndex.set(this.lastSuccessfulPage());
                this.error.set(error);
                return of(this._response());
              }),
              finalize(() => this.loading.set(false)),
            );
        }),
      )
      .subscribe((response) => {
        this._response.set(response);
      });
  }

  setPage(page: number) {
    this.pageIndex.set(page);
  }

  get(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  search(term: string): void {
    this.setPage(0);
    this.searchTerm.set(term);
  }
}
