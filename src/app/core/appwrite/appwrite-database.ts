import { inject, Injectable } from '@angular/core';
import { ID, TablesDB, type Models } from 'appwrite';

import { AppwriteClient } from './appwrite-client';
import { APPWRITE_CONFIG } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AppwriteDatabase {
  private readonly tablesDB = new TablesDB(inject(AppwriteClient).client);
  private readonly databaseId = APPWRITE_CONFIG.databaseId;

  listRows<Row extends Models.Row>(tableId: string, queries: string[] = []): Promise<Models.RowList<Row>> {
    return this.tablesDB.listRows<Row>({
      databaseId: this.databaseId,
      tableId,
      queries,
      ttl: 0,
    });
  }

  getRow<Row extends Models.Row>(tableId: string, rowId: string, queries: string[] = []): Promise<Row> {
    return this.tablesDB.getRow<Row>({
      databaseId: this.databaseId,
      tableId,
      rowId,
      queries,
    });
  }

  createRow<Row extends Models.Row>(
    tableId: string,
    data: Row extends Models.DefaultRow ? Partial<Models.Row> & Record<string, unknown> : Partial<Models.Row> & Omit<Row, keyof Models.Row>,
    rowId: string = ID.unique(),
    permissions?: string[],
  ): Promise<Row> {
    return this.tablesDB.createRow<Row>({
      databaseId: this.databaseId,
      tableId,
      rowId,
      data,
      permissions,
    });
  }

  updateRow<Row extends Models.Row>(
    tableId: string,
    rowId: string,
    data: Row extends Models.DefaultRow ? Partial<Models.Row> & Record<string, unknown> : Partial<Models.Row> & Partial<Omit<Row, keyof Models.Row>>,
    permissions?: string[],
  ): Promise<Row> {
    return this.tablesDB.updateRow<Row>({
      databaseId: this.databaseId,
      tableId,
      rowId,
      data,
      permissions,
    });
  }

  deleteRow(tableId: string, rowId: string): Promise<{}> {
    return this.tablesDB.deleteRow({
      databaseId: this.databaseId,
      tableId,
      rowId,
    });
  }
}
