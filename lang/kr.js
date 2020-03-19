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
    npeopleinchannel2: '저런 노래는 듣지도 않으면서 틀어놨군... 전기를 아껴주라구! 대기열은 전부 초기화했어',
    notoplay1: '재생목록이 종료되었습니다.',
    notoplay2: '더이상 플레이할 노래가 없어, 대기열을 초기화됬어! 그럼 난 이만👋'
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
    },
    volume: {
      nonp1: '재생중인 노래가 없습니다.',
      nonp2: '아무 것도 안 듣고 있잖아!',
      errvol: '음량은 1부터 100까지중의 정수만 입력해줘!'
    },
    resume: {
      cannotuse: "해당 기능은 이용하실 수 없습니다. : 고장났습니다. \n 일시정지 했던 곡을 다시 재생하려면 `#play (아무노래제목)`"
    }
  }
}
