<?php

session_start ();

var_dump($_SESSION['auth']);
echo "<br>";
var_dump($_SESSION);
echo "<br>";
var_dump(session_name());


//$_SESSION = array();

//認証情報にtrueがセットされていない場合はログインページへリダイレクト
if ($_SESSION['auth'] !== true) {
  header('Location: login.php');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if ($_POST['logout'] === 'yes') {
    $_SESSION = []; //セッション変数を初期化

    //クッキーの削除
    if (isset($_COOKIE[session_name()])) {
      setcookie(session_name(), '', time()-42000, '/');//セッションIDを消す
    }
    session_destroy();  //セッションの破壊
    header('Location: login.php');
    exit;
  }
}

$username = $_SESSION['username'];

 ?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset='utf-8'>
  <title>マイページ</title>
  <style>
  body {
    background: pink;
  }
    .container {
      width: 210px;
      margin: 30px auto 30px auto;
    }
  </style>
<body>
  <div class="container">
    ようこそ<?=$username;?>さん！
  </div>

  <div class="container">
    <form action="" method="post">
      <input type="hidden" name="logout" value="yes">
      <input type="submit" value="ログアウト">
    </form>
  </div>
</body>
</html>
