/* @flow */

import CRUDStore from './CRUDStore';
import {List} from 'immutable';

const CRUDActions = {

  _preSearchData: null,

  startSearching() {
    this._preSearchData = CRUDStore.getData();
  },

  search(e: Event) {
    const target = ((e.target:any):HTMLInputElement);
    const needle: string = target.value.toLowerCase();
    if (!needle) {
      CRUDStore.setData(this._preSearchData);
      return;
    }
    const fields = CRUDStore.getSchema().map(item => item.id);
    if (!fields) {
      return;
    }
    const searchdata = this._preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++ ) {
        if(row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });
    CRUDStore.setData(searchdata, /* commit */ false);
  },

  _sortCallback(a:(string|number), b:(string|number), descending: boolean):number {
    let res: number = 0;
    if (typeof a === 'number' && typeof b === 'number') {
      res = a - b;
    } else {
      res = String(a).localeCompare(String(b));
    }
    return descending ? -1 * res : res;
  },

  sort(key: string, descending: boolean) {
    CRUDStore.setData(CRUDStore.getData().sort(
      (a, b) => this._sortCallback(a[key], b[key], descending)
    ));
  },

  create(newRecord: Object) {
    let data: List<Object> = CRUDStore.getData();
    CRUDStore.setData(data.unshift(newRecord));
  },

  delete(recordId: number) {
    let data: List<Object> = CRUDStore.getData();
    CRUDStore.setData(data.remove(recordId));
  },

  updateRecord(recordId: number, newRecord: Object) {
    let data: List<Object> = CRUDStore.getData();
    CRUDStore.setData(data.set(recordId, newRecord));
  },

  updateField(recordId: number, key: string, value: string|number) {
    let data: List<Object> = CRUDStore.getData();
    let record = data.get(recordId);
    record[key] = value;
    CRUDStore.setData(data.set(recordId, record));
  },

};

export default CRUDActions
