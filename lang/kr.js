const { prefix, displayname } = require("../config")
module.exports = {
  handlers: {
    fail: `❌`
  },
  index: {
    onfix: "점검중입니다. 이용에 불편을 드려 죄송합니다."
  },
  music: {
    npeopleinchannel1: '채널에 아무도 없습니다.',
    npeopleinchannel2: '저런 노래는 듣지도 않으면서 틀어놨군... 전기를 아껴주라구! \`#p\`커맨드로 예전 대기열을 불러오고 재생할 수 있어!',
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
      errvol: '음량은 1부터 100까지중의 정수만 입력해줘!',
      changed: '음량을 변경하였습니다'
    },
    resume: {
    },
    play: {
      ns1: '검색결과가 없습니다',
      ns2: '검색내용을 다시 한 번 학인해줄래?'
    },
    pm2: {
      noperm: "권한없음"
    }
  }
}
