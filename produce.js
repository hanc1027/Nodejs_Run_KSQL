
function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

let locaiont_data = {
    UUID: "id-"+Date.now(),
    LONG: getRandom(100, 800),
    LAT: getRandom(10, 600),
}


const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" }),
    producer = new Producer(client),
    payloads = [
        { topic: 'test_distance_stream', messages: Buffer.from(JSON.stringify(locaiont_data)), partition: 0, key: locaiont_data.UUID },
    ];

console.log("請等待5秒，將開始Produce")

producer.on('ready', function () {
    setInterval(() => {
        producer.send(payloads, function (err, data) {
            console.log("SEND:", data);
        })
    }, 5000)
});

producer.on('error', function (err) { console.log("錯誤：", err) })