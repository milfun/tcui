import { Weapp } from './weapp'

type RecordToAny<T> = { [K in keyof T]: any };

export type CombinedComponentInstance<Data, Props, Methods> = Methods &
  WechatMiniprogram.Component.TrivialInstance &
  Weapp.FormField & {
    data: Data & RecordToAny<Props>;
  };

export interface TcuiComponentOptions<Data, Props, Methods, Instance> {
    data?: Data;
    props?: Props & Weapp.PropertyOption;
    methods?: Methods & Weapp.MethodOption<Instance>;
}