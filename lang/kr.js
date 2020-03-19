const { prefix, displayname } = require("../config")
module.exports = {
  handlers: {
    fail: `❌  -> name이 존재하지 않습니다(또는 string타입이 아닙니다)`
  },
  index: {
    activity: `${prefix}도움말 | 디스코드를 흥겹게!`,
    onfix: "점검중입니다. 이용에 불편을 드려 죄송합니다."
  },
  music: {
    npeopleinchannel1: '채널에 아무도 없습니다.',
    npeopleinchannel2: '저런 노래는 듣지도 않으면서 틀어놨군... 전기를 아껴주라구! 대기열은 전부 초기화했어'
  },
  commands: {
    ping: {
      fping: '퐁! 지연시간을 측정중입니다.',
      eping: '퐁!',
      dtime: '지연 시간',
      apidtime: 'API 지연 시간',
      pprg: `${displayname}의 핑 상태 : 정상`,
      pprb: `${displayname}의 핑 상태 : 비정상`
    }, 
    help: {
        description: '`#help [커맨드이름]`으로 설명을 확인하세요',
        syntax: "Syntax: <> = 꼭 필요함, [] = 옵션"
      },
    reboot: {
        okreboot: ':ok: 재시작합니다',
        noperm: "권한없음"
    }
  }
}
