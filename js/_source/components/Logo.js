/* @flow */

import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string,
}

let Logo = (props:Props) => {
  const cssclasses = classNames('Logo', props.className);
  return <div {...props} className={cssclasses} ></div>;
}

export default Logo
