import * as React from 'react';
import useNode from './state';
import View from './view';

export default ({ parent }: { parent?: any }) => <View {...useNode(parent)} />;
