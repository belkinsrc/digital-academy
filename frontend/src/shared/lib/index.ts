import { withNaming } from '@bem-react/classname';
import { ICommonComponentProps } from '../config/types';

export const commonComponentProps: ICommonComponentProps = {
  extraClasses: {
    title: 'title',
    container: 'container',
    button: 'button',
    totalPrice: 'total-price',
  },
  extraAttrs: {},
  getCN: (block = '', elem = '', mod = {}) => {
    return withNaming({
      n: '',
      e: '__',
      m: '--',
      v: '-',
    })(
      block,
      elem
    )(mod);
  },
};
