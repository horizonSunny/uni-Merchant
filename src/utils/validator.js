//校验手机格式
function checkMobile(mobile) {
  return RegExp(/^1[34578]\d{9}$/).test(mobile);
}
export { checkMobile };
