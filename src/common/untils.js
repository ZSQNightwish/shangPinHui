// 防抖函数,解决重复频繁调用问题
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//节流函数
export function throttle(func, wait, options = {}) {
  let timeout,
    previous = 0
  return function () {
    let now = +new Date()
    let remain = wait - (now - previous)

    if (remain < 0) {
      if (previous === 0 && !options.begin) {
        previous = now
        return
      }

      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      func.call(this, arguments)
    } else if (!timeout && options.end) {
      timeout = setTimeout(() => {
        func.call(this, arguments)
        timeout = null
      }, wait)
    }
  }
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//临时身份uuid 每次执行但是id不能变化 游客身份持久存储，id固定
import {v4 as uuidv4} from 'uuid';//引入uuid文件
export const getUUID = () => {
  //首先从本地存储获取uuid 看下本地存储是否已经存在uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //如果没有
  if (!uuid_token) {
    //生成游客的临时身份
    uuid_token = uuidv4()
    //本地存储进行存储这个 uuid
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}
