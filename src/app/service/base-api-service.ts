import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";

export interface BaseApiService<T> {

    load(): void;
    setPage(page: number): void;
    get(url: string): Observable<T>;
    handlePageChange(event: PageEvent, paginator: MatPaginator): void;

}
