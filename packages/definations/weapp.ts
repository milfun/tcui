export namespace Weapp {

  export interface FormField {
    data: {
        name: string;
        value: any;
    };
  }

  /**
   * obverser定义，miniprogram-api-typings缺少this定义
   */
  type Observer<Instance, T> = (
    this: Instance,
    newVal: T,
    oldVal: T,
    changedPath: Array<string | number>
  ) => void;


  export interface MethodOption<Instance> {
      [name: string]: (this: Instance, ...args: any[]) => any;
  }

  type PropertyType =
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | ArrayConstructor
    | ObjectConstructor
    | FunctionConstructor
    | null;

  export interface PropertyOption {
    [name: string]:
      | PropertyType
      | PropertyType[]
      | {
          /** 属性类型 */
          type: PropertyType | PropertyType[];
          /** 属性初始值 */
          value?: any;
          /** 属性值被更改时的响应函数 */
          observer?:
            | string
            | Observer<WechatMiniprogram.Component.TrivialInstance, any>;
          /** 属性的类型（可以指定多个） */
          optionalTypes?: PropertyType[];
        };
  }
}