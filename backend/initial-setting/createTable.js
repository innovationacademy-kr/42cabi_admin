const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pool = require('../config/database');
const config = require('../config/config');

const disabledLogQuery = fs
  .readFileSync('./disabled-log.sql')
  .toString('utf-8');
const userQuery = fs.readFileSync('./user.sql').toString('utf-8');
const cabinetQuery = fs.readFileSync('./cabinet.sql').toString('utf-8');
const banLogQuery = fs.readFileSync('./ban.sql').toString('utf-8');

const init = async () => {
  try {
    await Promise.all([
      pool.query(disabledLogQuery),
      pool.query(userQuery),
      pool.query(cabinetQuery),
      pool.query(banLogQuery),
    ]);
    console.log('  ✅  User Table');
    console.log('  ✅  Cabinet Table');
    console.log('  ✅  Disable Log Table');
    console.log('  ✅  Ban Log Table');
  } catch (error) {
    console.log(`❌ ${error}`);
  } finally {
    pool.end();
  }
};

console.log(
  `\n  해당 명령어는 한 번만 사용하시면 됩니다.\n\n  '${config.getDatabase()}'에\x1b[35m \`user\` \`cabinet\` \`disable\` \`ban log\` \x1b[0m 테이블을 만듭니다. (테이블이 존재하는 경우엔 만들지 않습니다.)\n\n  만드시겠습니까? [y/n] (EOF는 yes 처리됩니다.)`
);

rl.on('line', (line) => {
  if (line === 'n') {
    process.exit();
  } else if (line === 'y') {
    rl.close();
  } else {
    console.log('[y/n]으로 입력해주세요');
  }
});
rl.on('SIGINT', () => {
  process.exit();
});
rl.on('SIGQUIT', () => {
  process.exit();
});
rl.on('close', () => {
  init();
});
