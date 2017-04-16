/* @flow */

import classNames from 'classnames';
import React from 'react';

type Props = {
  href?: ?string,
  className?: ?string,
}

const Button = (props:Props) => {
  const cssclasses = classNames('Button', props.className);
  return props.href
    ? <a {...props} className={cssclasses} />
    : <button {...props} className={cssclasses} />;
}

export default Button
