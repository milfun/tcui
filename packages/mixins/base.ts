export const basic = Behavior({
    methods: {
        $emit(...args) {
            this.triggerEvent(...args);
        },

        set(data: object, callback: Function) {
            this.setData(data, callback);
            return new Promise((resolve) => wx.nextTick(resolve));
        },
    },
})