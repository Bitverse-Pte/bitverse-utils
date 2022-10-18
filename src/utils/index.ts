// "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15
//  (KHTML, like Gecko) Mobile/15E148 bitverse_app/1.0.0/ios" = $1
const ua = window.navigator.userAgent
export const inBitverse = /bitverse_app/i.test(ua)
