/* @flow */

import classNames from 'classnames';
import React, {Component} from 'react';
import Button from './Button';

type Props = {
  header: string,
  confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: Array<any>,
};

class Dialog extends Component {

  props: Props;

  static defaultProps = {
    confirmLabel: 'OK',
    modal: false,
    onAction: (_) => {},
    hasCancel: true,
  };

  // Componentがアンマウントされる前の処理
  componentWillUnmount() {
    if (document.body === null) return;
    if (document.body.classList === null) return;
    document.body.classList.remove('DialogModalOpen');
  }

  // Componentがマウントされた後の処理
  componentDidMount() {
    if (this.props.modal) {
      if (document.body === null) return;
      if (document.body.classList === null) return;
      document.body.classList.add('DialogModalOpen');
    }
  }

  render() {
    return (
      <div className={classNames({
        'Dialog': true,
        'DialogModal': this.props.modal,
      })}>
        <div className={classNames({
          'DialogModalWrap': this.props.modal,
        })}>
          <div className="DialogHeader">{this.props.header}</div>
          <div className="DialogBody">{this.props.children}</div>
          <div className="DialogFooter">
            {this.props.hasCancel
              ? <span
                  className="DialogDismiss"
                  onClick={this.props.onAction.bind(this, 'dismiss')}>
                  キャンセル
                </span>
              : null
            }
            <Button onClick={this.props.onAction.bind(this,
              this.props.hasCancel ? 'confirm' : 'dismiss')}>
              {this.props.confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    );
  }

}

export default Dialog
