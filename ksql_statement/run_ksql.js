const axios = require('axios')
const readline = require('readline');
const fs = require('fs');

module.exports = {
  getSQLStatement() {
    var file = 'mvp03.sql';
    var rl = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });

    rl.on('line', function (line) {
      var reg = RegExp(/--*/);
      if (line.match(reg) || line.length == 0) {
        // console.log(line)
      } else {
        SendSQL(line)
      }
    });
  }
}


function SendSQL(sqlStatement) {
  var config = {
    'Content-Type': 'application/vnd.ksql.v1+json'
  },
    ksql_statement = {
      "ksql": sqlStatement
    }

  axios.post('http://localhost:8088/ksql', ksql_statement, config)
    .then((res) => {
      DeterminateType(res.data[0], res.data[0]['@type'])
    })
    .catch((error) => {
      console.log("使用者執行指令:",error.response.data.statementText)
      console.error("錯誤訊息：", error.response.data.message)
    })

}

function DeterminateType(res_data, type) {
  console.log("使用者執行指令:",res_data.statementText)

  switch (type) {
    case "tables":
      console.log("存在的Tables有：", res_data.tables)
      break;

    case "queries":
      console.log("執行中的queries有：", res_data.queries[0])
      break;

    case "kafka_topics":
      console.log("存在的Topics有：", res_data.topics)
      break;

    case "currentStatus":
      console.log("指令執行狀況:", res_data.commandStatus.status)
      console.log("KSQL Server回覆訊息:", res_data.commandStatus.message)
      break;

    case "statement_error":
      console.log("錯誤訊息：", res_data.message)
      break;

    default:
      break;
  }
  console.log("---------------------")
}