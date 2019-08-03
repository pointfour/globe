const { exec } = require('child_process');

function act(i) {
  console.log(i)
  let data = datas[i]
  if (data.shell) {
    shellCommand(data.shell)
  }
}

function shellCommand(command) {
  exec(command, (err, stdout, stderr) => {
    if (err) console.log(err)
  })
}