/* @flow */

import React from 'react';

type Props = {
  onAction: Function,
};

const Actions = (props:Props) =>
  <div className="Actions">
    <span
      tabIndex="0"
      className="ActionsInfo"
      title="詳しい情報"
      onClick={props.onAction.bind(null, 'info')}>&#8505;</span>
    <span
      tabIndex="1"
      className="ActionsEdit"
      title="編集"
      onClick={props.onAction.bind(null, 'edit')}>&#10000;</span>
    <span
      tabIndex="2"
      className="ActionsDelete"
      title="削除"
      onClick={props.onAction.bind(null, 'delete')}>×</span>
  </div>

Actions.defaultProps = {
  onAction: () => {},
};

export default Actions
