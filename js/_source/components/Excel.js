/* @flow */

import classNames from 'classnames';
import invariant from 'invariant';
import React, {Component} from 'react';
import {List} from 'immutable';
import CRUDStore from '../flux/CRUDStore';
import CRUDActions from '../flux/CRUDActions';
import Actions from './Actions';
import Dialog from './Dialog';
import Form from './Form';
import FormInput from './FormInput';
import Rating from './Rating';

type EditState = {
  row: number,
  key: string,
};

type DialogState = {
  idx: number,
  type: string,
};

type State = {
  data: List<Object>,
  sortby: ?string,
  descending: boolean,
  edit: ?EditState,
  dialog: ?DialogState,
};

class Excel extends Component {

  state: State;
  schema: Array<Object>;

  constructor() {
    super();
    // getInitialState
    this.state = {
      data: CRUDStore.getData(),    // データ
      sortby: null,                 // ソートの基準列(schema.id)
      descending: false,            // 降順かどうか
      edit: null,                   // {row:行番号, key:列番号}
      dialog: null,                 // {type: 種類, idx: 行番号}
    };
    this.schema = CRUDStore.getSchema();
    CRUDStore.addListener('change', () => {
      this.setState({
        data: CRUDStore.getData(),
      })
    })
  }

  componentWillReceiveProps() {
    this.setState({data: CRUDStore.getData()});
  }

  _sortCallback(a:(string|number), b:(string|number), descending: boolean): number {
    let res:number = 0;
    if (typeof a === 'number' && typeof b === 'number') {
      res = a - b;
    } else {
      res = String(a).localeCompare(String(b));
    }
    return descending ? -1 * res : res;
  }

  _sort(key:string) {
    const descending = this.state.sortby === key && !this.state.descending;
    CRUDActions.sort(key, descending);
    // 並び替えたデータを指定して状態を変更
    this.setState({
      sortby: key,
      descending: descending,
    });
  }

  _showEditor(e: Event) {
    const target = ((e.target:any):HTMLElement);
    this.setState({
      edit: {
        row: parseInt(target.dataset.row, 10),
        key: target.dataset.key,
      },
    });
  }

  _save(e: Event) {
    // Submitでページの再読込が発生しないようにデフォルトの送信を無効化
    e.preventDefault();
    // 保存処理
    invariant(this.state.edit, 'ステートeditが不正です')
    CRUDActions.updateField(
      this.state.edit.row,
      this.state.edit.key,
      this.refs.input.getValue()
    );
    this.setState({
      edit: null, // 編集の終了
    });
  }

  _actionClick(rowidx:number, action:string) {
    this.setState({dialog: {type: action, idx: rowidx}});
  }

  _deleteConfirmationClick(action:string) {
    this.setState({dialog: null});
    if (action === 'dismiss') {
      return;
    }
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'ステートdialogが不正です');
    CRUDActions.delete(index);
  }

  _saveDataDialog(action:string) {
    this.setState({dialog: null});
    if (action === 'dismiss') {
      return;
    }
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'ステートdialogが不正です');
    CRUDActions.updateRecord(index, this.refs.form.getData());
  }

  render() {
    return (
      <div className="Excel">
        {this._renderTable()}
        {this._renderDialog()}
      </div>
    );
  }

  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }
    switch (this.state.dialog.type) {
      case 'delete':
        return this._renderDeleteDialog();
      case 'info':
        return this._renderFormDialog(true);
      case 'edit':
        return this._renderFormDialog();
      default:
        throw Error(`不正なダイアログの種類： ${this.state.dialog.type}`);
    }
  }

  _renderDeleteDialog() {
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'ステートdialogが不正です');
    const first = CRUDStore.getRecord(index);
    invariant(first, 'レコードが取得できませんでした');
    const nameguess:string = first[Object.keys(first)[0]];
    return (
      <Dialog
        modal={true}
        header="削除の確認"
        confirmLabel="削除"
        onAction={this._deleteConfirmationClick.bind(this)}
      >{`削除してもよいですか： "${nameguess}"?`}</Dialog>
    );
  }

  _renderFormDialog(readonly: ?boolean) {
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'ステートdialogが不正です');
    return (
      <Dialog
        modal={true}
        header={readonly ? '項目の情報' : '項目の編集'}
        confirmLabel={readonly ? 'OK' : '保存'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          ref="form"
          fields={this.schema}
          recordId={index}
          readonly={!!readonly} />
      </Dialog>
    );
  }

  _renderTable() {
    return (
      <table>
        <thead>
          <tr>
            {this.schema.map((item:Object) => {
              if(!item.show) {
                return null;
              }
              let title = item.label;
              if (this.state.sortby === item.id) {
                title += this.state.descending ? ' \u2191' : '\u2193';
              }
              return (
                <th
                  className={`schema-${item.id}`}
                  key={item.id}
                  onClick={this._sort.bind(this, item.id)}>
                  {title}
                </th>
              );
            }, this)}
            <th className="ExcelNotSortable">操作</th>
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor.bind(this)}>
          {CRUDStore.getData().map((row:Object, rowidx:number) => {
            return (
              <tr key={rowidx}>
                {Object.keys(row).map((cell:string, idx:number) => {
                  const schema:Object = this.schema[idx];
                  if (!schema || !schema.show) {
                    return null;
                  }
                  const isRating:boolean = schema.type === 'rating';
                  const edit = this.state.edit;
                  let content = row[cell];
                  if (!isRating && edit && edit.row === rowidx && edit.key === schema.id) {
                    content = (
                      <form onSubmit={this._save.bind(this)}>
                        <FormInput ref="input" {...schema}
                          defaultValue={content} />
                      </form>
                    );
                  } else if (isRating) {
                    content = <Rating readonly={true} defaultValue={Number(content)} />;
                  }
                  return (
                    <td
                      className={classNames({
                        [`schema-${schema.id}`]: true,
                        'ExcelEditable': !isRating,
                        'ExcelDataLeft': schema.align === 'left',
                        'ExcelDataRight': schema.align === 'right',
                        'ExcelDataCenter': schema.align !== 'left' && schema.align !== 'right',
                      })}
                      key={idx}
                      data-row={rowidx}
                      data-key={schema.id}>{content}</td>
                  );
                }, this)}
                <td className="ExcelDataCenter">
                  <Actions onAction={this._actionClick.bind(this, rowidx)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Excel;
