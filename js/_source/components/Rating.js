/* @flow */

import classNames from 'classnames';
import React, {Component} from 'react';

type Props = {
  defaultValue: number,
  readonly: boolean,
  max: number,
}

type State = {
  rating: number,
  tmpRating: number,
}

class Rating extends Component {

  props:Props;
  state:State;

  static defaultProps = {
    defaultValue: 0,
    readonly: false,
    max: 5,
  }

  constructor(props:Props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    };
  }

  getValue():number {
    return this.state.rating;
  }

  // マウスオーバー時
  setTemp(rating:number) {
    this.setState({tmpRating: rating});
  }

  // クリック時
  setRating(rating:number) {
    this.setState({
      tmpRating: rating,
      rating: rating,
    });
  }

  // マウスアウト時に実際の値に戻す
  reset() {
    this.setTemp(this.state.rating);
  }

  // 外部からの変更に応答
  componentWillReceiveProps(nextProps:Props) {
    this.setRating(nextProps.defaultValue);
  }

  render() {
    const stars = [];
    for(let i = 1; i <= this.props.max; i++) {
      stars.push(
        <span
          className={i <= this.state.tmpRating ? 'RatingOn' : null}
          key={i}
          onClick={ !this.props.readonlry && this.setRating.bind(this, i) }
          onMouseOver={ !this.props.readonlry && this.setTemp.bind(this, i) }
        >&#9734;</span>
      );
    }
    return (
      <div
        className={classNames({
          'Rating': true,
          'RatingReadonly': this.props.readonly,
        })}
        onMouseOut={this.reset.bind(this)}
      >
        {stars}
        {this.props.readonly || !this.props.id
          ? null
          : <input
              type="hidden"
              id={this.props.id}
              value={this.state.rating} />
        }
      </div>
    );
  }

}

export default Rating
