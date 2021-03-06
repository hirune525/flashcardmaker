'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
import Logo from './components/Logo';
import Button from './components/Button';
import Suggest from './components/Suggest';
import Rating from './components/Rating';
import FormInput from './components/FormInput';
import Form from './components/Form';
import Actions from './components/Actions';
import Dialog from './components/Dialog';
import schema from './schema';
import Excel from './components/Excel';
import Whinepad from './components/Whinepad';
*/

/*
let data = {};
schema.forEach(item => data[item.id] = item.sample);
data = [data];
*/

_reactDom2.default.render(_react2.default.createElement(
  'div',
  { style: { padding: '20px' } },
  _react2.default.createElement(
    'h1',
    null,
    '\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u4E00\u89A7'
  )
), document.getElementById('app'));

/*
    <h2>Logo</h2>
    <div style={{ display:'inline-block', background: 'purple' }}>
      <Logo />
    </div>

    <h2>Button</h2>
    <div>onClickが指定されたButton: <Button onClick={(e)=>alert('クリックされました')}>クリック</Button></div>
    <div>hrefが指定されたButton: <Button href="http://reactjs.com">フォローする</Button></div>
    <div>クラス名が指定されたButton: <Button className="custom">何もしません</Button></div>

    <h2>Suggest</h2>
    <div><Suggest options={['eenie', 'meenie', 'miney', 'mo']} /></div>

    <h2>Rating</h2>
    <div>初期値なし： <Rating /></div>
    <div>初期値４： <Rating defaultValue={4} /></div>
    <div>最大値１１： <Rating max={11} /></div>
    <div>読み取り専用： <Rating readonly={true} defaultValue={3} /></div>

    <h2>FormInput</h2>
    <table>
      <tbody>
        <tr>
          <td>単純な入力フィールド</td>
          <td><FormInput /></td>
        </tr>
        <tr>
          <td>デフォルト値</td>
          <td><FormInput defaultValue="デフォルトです" /></td>
        </tr>
        <tr>
          <td>年の入力</td>
          <td><FormInput type="year" /></td>
        </tr>
        <tr>
          <td>評価</td>
          <td><FormInput type="rating" defaultValue={4} /></td>
        </tr>
        <tr>
          <td>入力候補の提示</td>
          <td>
            <FormInput
              type="suggest"
              options={['red', 'green', 'blue']}
              defaultValue="green"
            />
          </td>
        </tr>
        <tr>
          <td>単純なテキストエリア</td>
          <td><FormInput type="text" /></td>
        </tr>
      </tbody>
    </table>

    <h2>Form</h2>
    <div>
      <Form
        fields={[
          {label: '評価', type: 'rating', id:'rateme'},
          {label: 'あいさつ', id: 'freetext'},
        ]}
        initialData={{
          rateme: 4,
          freetext: 'こんにちは！',
        }}
      />
    </div>

    <h2>Actions</h2>
    <div><Actions onAction={type => alert(type)} /></div>

    <h2>Dialog</h2>
    <Dialog
      header="単純な例"
      onAction={type => alert(type)}>
      こんにちは！
    </Dialog>

    <Dialog
      header="キャンセルボタンなし、カスタムのボタン"
      hasCancel={false}
      confirmLabel="ラベル"
      onAction={type => alert(type)}>
      何でも表示できます。例えば、
      <Button>ボタン</Button>
    </Dialog>

    <h2>Excel</h2>
    <div>
      <Excel
        schema={schema}
        initialData={data}
        onDataChange={()=>alert('hoge')} />
    </div>

    <h2>Whinepad</h2>
    <div>
      <Whinepad schema={schema} initialData={data} />
    </div>

*/