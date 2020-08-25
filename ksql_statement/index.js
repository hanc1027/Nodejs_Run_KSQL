const kafka = require('kafka-node');
var client = new kafka.KafkaClient();

// import 自定義模組
const run_ksql = require('./run_ksql')

run_ksql.getSQLStatement('./test.sql')

// createTopic("test2_topic") // 創建Topic

function createTopic(topic_name) {

    var topicsToCreate = [{
        topic: topic_name,
        partitions: 1,
        replicationFactor: 1
    }];

    client.createTopics(topicsToCreate, (error, result) => {
        console.log("創建Topic結果",result)
        if(error) console.log("創建Topic錯誤：",error)
    });

}