//Current limiting

// 进入程序的时间
let entryTime = +new Date();
// 限制请求次数为100次
const limitCount = 100;
// 间隔为1s
const interval = 1000;
// 当前请求的次数
let reqCount = 0;
// 更新进入程序的时间
function updateEntryTime() {
  entryTime = +new Date();
}
// 监测器
function startupMonitor() {
  const startupMonitorTime = +new Date();

  if (startupMonitorTime < entryTime + interval) {
    if (reqCount < limitCount) {
      ++reqCount;
      return true;
    }
  } else {
    updateEntryTime();
    reqCount = 0;
    return false;
  }
}
function executeLimit() {
  // 模拟请求500次
  for (let index = 0; index < 500; index++) {
    startupMonitor() ? normalPass(index) : RestrictedPass(index)
  }
}

const PROMPT = ref('程序即将开始');

function normalPass(index = 0) {
  const PROMPT = `请求${index}次`;
  console.log(PROMPT);
}
function RestrictedPass(index = 0) {
  const PROMPT = `限流${index}次`;
  console.log(PROMPT);
}

executeLimit();