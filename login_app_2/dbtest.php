<?php

require_once(__DIR__ . '/' . 'config.php');

try {
  $dbh = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD);
  $sql = 'select * from users';
  $users = $dbh->query($sql);

  foreach ($users as $u) {
    echo $u['id'] . '：';
    echo $u['username'] . '<br>';
  }

} catch (PDOException $e) {
  echo 'Error:' . $e->getMessage();
}

$dbh = null;



 ?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset='utf-8'>
  <title>DB接続テスト</title>
  <style>
    #container {
      width: 210px;
      margin: 30px auto 30px auto;

    }

    input[type="text"], input[type="password"] {
      width: 200px;
      line-height:18px;
      font-size:14px;
      margin-bottom:5px;
    }
  </style>
</head>

<body>
  <div id="container">
    このページはデータベース接続の練習用ページです。
</div>
</body>
</html>
