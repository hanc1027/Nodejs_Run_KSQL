const fs = require('fs');
const axios = require('axios')
const readline = require('readline');
const Config = require('../config')

let sqlStatements = ""
module.exports = {
  getSQLStatement(FILE_NAME) {
    var file = FILE_NAME;
    var rl = readline.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false
    });

    rl.on('line', function (line) {
      var reg = line.startsWith('--');
      if (reg || line.length == 0) {
        // console.log(line)
      } else {
        sqlStatements += line
      }
    }).on("close", () => {
        SendSQL(sqlStatements)
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


  axios.post(`http://${Config.ip_address}:8088/ksql`, ksql_statement, config)
    .then((res) => {
      res.data.forEach(value=>{
        DeterminateType(value, value['@type'])
      })
    })
    .catch((error) => {
      console.log("錯誤時，使用者執行指令:", error.response.data.statementText)
      console.error("錯誤訊息：", error.response.data.message)
      console.log("---------------------")
    })

}

function DeterminateType(res_data, type) {
  console.log("使用者執行指令:", res_data.statementText)
  switch (type) {
    case "tables":
      console.log("存在的Tables有：", res_data.tables)
      break;

    case "queries":
      console.log(`執行中的queries有 ${res_data.queries.length}個\n<<<>>>`)
      res_data.queries.forEach((value, index) => {
        console.log(`第${index + 1}個：`)
        console.log("執行中的queries：", value.queryString)
        console.log("執行中的queries的ID：", value.id)
        console.log("與之相相關聯：", value.sinks)
        console.log("狀態：", value.state)
        console.log("<<<>>>")
      });
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