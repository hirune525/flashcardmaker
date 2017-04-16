'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CRUDStore = require('./flux/CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _Logo = require('./components/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _Whinepad = require('./components/Whinepad');

var _Whinepad2 = _interopRequireDefault(_Whinepad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_CRUDStore2.default.init(_schema2.default);

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    'h1',
    { className: 'app-header' },
    _react2.default.createElement(_Logo2.default, null),
    ' Whilepad\u306B\u3088\u3046\u3053\u305D\uFF01'
  ),
  _react2.default.createElement(_Whinepad2.default, { schema: _schema2.default, initialData: _CRUDStore2.default.getData() })
), document.getElementById('app'));