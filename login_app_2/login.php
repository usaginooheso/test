<?php

require_once(__DIR__ . '/' . 'config.php');

session_start();

//テスト用。。。
// var_dump($_SESSION['auth']);
// echo "<br>";
// var_dump($_SESSION);
// echo "<br>";
// var_dump(session_name());


//リクエストがPOSTだったら
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  //ユーザー名とパスワードが入力された状態だったら
  if (
    isset($_POST['username']) &&
    isset($_POST['password'])
  ){    //ユーザー名とパスワードが正しいかどうかチェック
    try {
      $dbh = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD);
      $sql = 'select * from users';
      $users = $dbh->query($sql);
      //ここまででデータベースから一覧の抽出ができた状態
      // ここからforeach文で認証していく
      foreach ($users as $u) {
        $correctUsername = $u['username'];
        $correctPassword = $u['password'];
        if ($correctUsername === $_POST['username']) {
          if ($correctPassword === $_POST['password']) {
            $_SESSION['username'] = $_POST['username']; //postされたユーザ名をセッションに入れる
            $_SESSION['auth'] = true; //認証情報にtrueを代入
            header('Location: mypage.php'); //マイページへ遷移
            exit;
          }
        } else {
          throw new Exception('ユーザー名、もしくはパスワードが違います。');
        }
      }

    } catch (Exception $e) {
      echo 'Error:' . $e->getMessage();
    }

    $dbh = null;
  }
}

//認証情報がtrueの場合はマイページへリダイレクト
if (isset($_SESSION['auth']) && $_SESSION['auth'] === true) {
  header('Location: mypage.php');
  exit;
}

// //リクエストがPOSTだったら
// if ($_SERVER['REQUEST_METHOD'] === POST) {
//   if (//ユーザー名とパスワードが入力された状態だったら
//     isset($_POST['username']) &&
//     isset($_POST['password'])
//     //ユーザー名とパスワードが正しかったら
//   ) {if ($_POST['username'] === $username && $_POST['password'] === $password){
//           $_SESSION['username'] = $_POST['username']; //postされたユーザ名をセッションに入れる
//           $_SESSION['auth'] = true; //認証情報にtrueを代入
//           header('Location: mypage.php'); //マイページへ遷移
//           exit;
//         } else { //ユーザ名とパスワードが正しくない場合は
//           echo "ユーザー名、もしくはパスワードが違います。";
//           $_SESSION['auth'] = 'false';
//         }
//     }
// }

 ?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset='utf-8'>
  <title>ログイン</title>
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
    このページはデータベースを使ったログインの練習ページです。<br>

    <h2>ログイン</h2>
    <form action="" method="post">
      ユーザー名<input type="text" name="username"><br>
      パスワード<input type="password" name="password"><br>
      <input type="submit" value="login">
    </form>
</div>
</body>
</html>
