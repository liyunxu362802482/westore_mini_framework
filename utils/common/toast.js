export default function(message, isSuccess = true) {
    if (!message) {
        message = isSuccess ? 'success' : 'fail';
    }
    const iconPath = isSuccess ? '../../assets/toast/success.png' : '../../assets/toast/fail.png';
    wx.showToast({ title: message, image: iconPath, duration: 2000 });
}