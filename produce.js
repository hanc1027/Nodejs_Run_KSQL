let phone_data = {
    phoneID: "PHONE01"
}

const kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" }),
    producer = new Producer(client),
    payloads = [
        { topic: 'test_topic', messages: Buffer.from(JSON.stringify(phone_data)), partition: 0, key: phone_data.phoneID },
    ];

producer.on('ready', function () {
    setInterval(() => {
        producer.send(payloads, function (err, data) {
            console.log("SEND:", data);
        })
    }, 5000)
});

producer.on('error', function (err) { console.log("錯誤：", err) })