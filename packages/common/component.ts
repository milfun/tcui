import { basic } from '../mixins/base';

import {
    TcuiComponentOptions,
    CombinedComponentInstance
} from 'definations/index';


function mapKeys(source: object, target: object, map: object) {
    Object.keys(map).forEach((key) => {
      if (source[key]) {
        target[map[key]] = source[key];
      }
    });
}
  
function TcuiComponent<Data, Props, Methods>(
    tcuiOptions: TcuiComponentOptions<
        Data,
        Props,
        Methods,
        CombinedComponentInstance<Data, Props, Methods>
    > = {}
) : void {
    const options: any = {};

    mapKeys(tcuiOptions, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        relations: 'relations',
        destroyed: 'detached',
        classes: 'externalClasses',
    });

    // add default behaviors
    options.behaviors = options.behaviors || [];
    options.behaviors.push(basic);

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
    };


    Component(options);
}

export { TcuiComponent };