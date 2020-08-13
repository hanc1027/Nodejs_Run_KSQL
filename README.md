## Node.js Kafka模版
- 可使用Node.js Produce資料至Kafka
- 可使用Node.js 從Kafka Consume資料回來
- 可從 `sql_statement`的資料夾中執行ksql statement

### 執行指令

#### 安裝依賴
```bash
npm install
```

#### Kafka需先確定已啟動
- 9092 port的Broker是啟動的狀態

#### Produce 資料至Kafka
```bash
npm run produce
```

#### 從Kafka Consume資料
```bash
npm run consume
```

#### 執行ksql
```bash
npm run ksql
```