import { useMachine } from '@xstate/react';

function getMethods([state, send]: any) {
  const methods: any = {};
  for (let type of state.nextEvents) {
    methods[type] = (data: any) => send({ type, data });
  }
  return methods;
}

function setValue(obj: any, path: string[], value: any) {
  let node = obj;
  while (path.length - 1) {
    let location = path.shift();
    if (!location) break;
    if (!(location in node)) node[location] = {};
    node = node[location];
  }
  node[path[0]] = value;
}

export const makeStateHook = (machine: any, extension = (_: any) => ({})) => (
  parent?: any
) => {
  const [state, send] = useMachine(machine);
  const methods = getMethods([state, send]);
  const { id } = machine;
  const path = parent?.path.concat('.' + id) ?? `App.${id}`;
  const instance: any = {
    parent,
    methods,
    state,
    id,
    path,
    App: parent?.App ?? {},
  };
  instance.instance = instance;

  setValue(instance, path.split('.'), { state, ...methods });

  return Object.assign({}, instance, extension(instance));
};

export const connectView = (View: any, useStateHook: any) => ({
  parent,
}: {
  parent?: any;
}) => <View {...useStateHook(parent)} />;
