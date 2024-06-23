
const express = require('express');
const db = require('./database/db');

const cors = require('cors');

const app = express();
const port = 3001;	// React의 포트 번호와 다르게 하기 위해

// import 하는 부분
const bodyParser = require("body-parser");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  db.query('SELECT * FROM BOARD', function (err, results, fields) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT id, title, content, category,DATE_FORMAT(lastday, '%Y.%m.%d') lastday , DATEDIFF(lastday,NOW()) AS dday FROM BOARD ORDER BY lastday;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });


});

app.post("/insert", (req, res) => {

  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;
  var lastday = req.body.lastday;

  const sqlQuery =
    "INSERT INTO BOARD (TITLE, CONTENT, CATEGORY, LASTDAY) VALUES (?,?,?,?);";
  db.query(sqlQuery, [title, content, category, lastday], (err, result) => {
    res.send(result);
  });
});



app.post("/delete", (req, res) => {

  var id = req.body.id;

  const sqlQuery =
    "DELETE FROM BOARD WHERE ID = ? ;";
  db.query(sqlQuery, [id], (err, result) => {
    res.send(result);

  });
});

app.post("/oneselect", (req, res) => {

  var id = req.body.id;

  const sqlQuery = "SELECT id, title, content, category,DATE_FORMAT(lastday, '%Y.%m.%d') lastday FROM BOARD WHERE ID = ?"
  db.query(sqlQuery, [id], (err, result) => {
    res.send(result);


  });
});



app.post("/update", (req, res) => {


  var title = req.body.title;
  var content = req.body.content;
  var category = req.body.category;
  var lastday = req.body.lastday;
  var id = req.body.id;

  const sqlQuery =
    "UPDATE BOARD SET TITLE = ?, CONTENT = ?, CATEGORY = ?, LASTDAY = ? WHERE ID = ? ;";
  db.query(sqlQuery, [title, content, category, lastday, id], (err, result) => {
    res.send(result);
  });
});


// 하루 건수
app.get("/selecttodaycnt", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS CNT FROM BOARD WHERE LASTDAY = CURDATE()";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// 주말 건수
app.get("/selectweekcnt", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS CNT FROM BOARD WHERE LASTDAY BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW()";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

// 한달 건수
app.get("/selectmonthcnt", (req, res) => {
  const sqlQuery = "SELECT COUNT(*) AS CNT FROM BOARD WHERE LASTDAY BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW()";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});









//일주일전 
//SELECT count(*) FROM  project.board  WHERE lastday BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW(); 

//오늘
//SELECT count(*) from project.board 
//where lastday = CURDATE() 


//한달
//SELECT count(*)  FROM project.board WHERE lastday BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});