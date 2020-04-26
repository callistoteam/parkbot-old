const { displayname } = require("../config")
module.exports = {
  commands: {
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
