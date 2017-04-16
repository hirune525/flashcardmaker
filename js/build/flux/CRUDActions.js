'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CRUDStore = require('./CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDActions = {

  _preSearchData: null,

  startSearching: function startSearching() {
    this._preSearchData = _CRUDStore2.default.getData();
  },
  search: function search(e) {
    var target = e.target;
    var needle = target.value.toLowerCase();
    if (!needle) {
      _CRUDStore2.default.setData(this._preSearchData);
      return;
    }
    var fields = _CRUDStore2.default.getSchema().map(function (item) {
      return item.id;
    });
    if (!fields) {
      return;
    }
    var searchdata = this._preSearchData.filter(function (row) {
      for (var f = 0; f < fields.length; f++) {
        if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return true;
        }
      }
      return false;
    });
    _CRUDStore2.default.setData(searchdata, /* commit */false);
  },
  _sortCallback: function _sortCallback(a, b, descending) {
    var res = 0;
    if (typeof a === 'number' && typeof b === 'number') {
      res = a - b;
    } else {
      res = String(a).localeCompare(String(b));
    }
    return descending ? -1 * res : res;
  },
  sort: function sort(key, descending) {
    var _this = this;

    _CRUDStore2.default.setData(_CRUDStore2.default.getData().sort(function (a, b) {
      return _this._sortCallback(a[key], b[key], descending);
    }));
  },
  create: function create(newRecord) {
    var data = _CRUDStore2.default.getData();
    _CRUDStore2.default.setData(data.unshift(newRecord));
  },
  delete: function _delete(recordId) {
    var data = _CRUDStore2.default.getData();
    _CRUDStore2.default.setData(data.remove(recordId));
  },
  updateRecord: function updateRecord(recordId, newRecord) {
    var data = _CRUDStore2.default.getData();
    _CRUDStore2.default.setData(data.set(recordId, newRecord));
  },
  updateField: function updateField(recordId, key, value) {
    var data = _CRUDStore2.default.getData();
    var record = data.get(recordId);
    record[key] = value;
    _CRUDStore2.default.setData(data.set(recordId, record));
  }
};

exports.default = CRUDActions;