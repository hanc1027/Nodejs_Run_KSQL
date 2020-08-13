const kafka = require('kafka-node');
const ConsumerGroup = kafka.ConsumerGroup;
var options = {
    kafkaHost: 'localhost:9092',
    batch: undefined, 
    ssl: true, 
    groupId: 'test_room',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    encoding: 'utf8',
    fromOffset: 'latest', // 或earliest
    commitOffsetsOnFirstJoin: true, 
    outOfRangeOffset: 'earliest', 
    onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
};

var consumerGroup = new ConsumerGroup(options, ['test_distance_stream']);

consumerGroup.on('message', function (message) {
    console.log("Consume資料：", message);
});

consumerGroup.on('error', function (err) {
    console.log("Consume錯誤:", err)
})

