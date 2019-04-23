/**
 *  封装微信授权
 *  @param  miniApp  继承外层index的 miniApp
 *  @param  jsCode   授权后的票据
 */

/**
 * 微信授权流程
 * 老版本的方式 ：
 *     1、通过wx.login() 调用，获取到 jscode
 *     2、获取到jscode后调用 wx.getUserInfo() 获取到用户信息
 * 
 * 新版本的方式
 *     1、界面上必须有一个landing的授权页面，有一个按钮绑定的 open-type="getUserInfo"
 *     2、点击按钮后，会有相信的信息带到 bindgetuserinfo 所绑定的方法
 *     3、调用wx.login() 调用，获取到 jscode
 * 
 * 1、根据jscode和用户的信息，调用后端接口，后端会将用户数据插入、更新到数据库。返回一个unionid和用户的id
 * 2、将用户id存入到localstorage。下次进入小程序就不需要在走授权
 * **/


const storageId = 'mini_xx_user_id';

export default function(userInfo) {
    if (userInfo) {

    } else {

    }
}

//  function fetchUserInfo(){
//     const userId = wx.getStorageSync(this.storageId);
//     if (userId) {
//         wx.checkSession({
//             // 用户授权还没过期
//             success: () => {
//                 // 拿userid去后台换取用户的信息，这边就不用走授权，直接跳页面
//                 this.request().getUserInfoById(userId).then((data) => {
//                     const userInfo = {};
//                     const userId = 100;
//                     this.handleResult(userId, userInfo);
//                 });
//             },
//             // 授权已经过期
//             fail: (error) => {
//                 this.log(error);
//                 // 移除本地存储
//                 wx.removeStorageSync(this.storageId);
//                 this.begainLogin();
//             }
//         });
//     } else {
//         this.log(`userid is null`);
//         // 移除本地存储
//         wx.removeStorageSync(this.storageId);
//         this.begainLogin();
//     }
//  }