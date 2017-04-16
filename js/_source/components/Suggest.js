/* @flow */

import React, {Component} from 'react';

type Props = {
  id?: string,
  defaultValue?: string,
  options: Array<string>,
}

type State = {
  value: string,
}

class Suggest extends Component {

  props: Props;
  state: State;

  constructor(props:Props) {
    super(props);
    this.state = {value: props.defaultValue || ''};
  }

  getValue(): string {
    return this.state.value;
  }

  _changeValue(e:Event) {
    const target = ((e.target:any):HTMLInputElement);
    this.setState({
      value: target.value,
    });
  }

  render() {
    const randomid:string = Math.random().toString(16).substring(2);
    return (
      <div>
        <input
          list={randomid}
          defaultValue={this.props.defaultValue}
          onChange={(e:Event) => this._changeValue(e)}
          id={this.props.id} />
        <datalist id={randomid}>{
            this.props.options.map((item:string, idx:number) =>
              <option value={item} key={idx} />
            )
        }</datalist>
      </div>
    );
  }
}

export default Suggest
