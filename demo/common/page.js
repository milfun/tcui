/**
 * 为所有页面添加共同的分享接口
 * @param {*} options 页面其他options自动导入
 */
export default function(options = {}) {
    return Page({
      onShareAppMessage() {
        return {
          title: 'Tcui Weapp 组件库演示',
          path: 'pages/job/index', //转发的路径
          imageUrl: 'http://wzdx.top/images/share-ad2.png',
        };
      },
      ...options
    });
  }
  