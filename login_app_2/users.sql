
create database login_app;

grant all on login_app.* to dbuser@localhost;

mu4uJsif

quit;
mysql -u dbuser -p login_app;

create table users(
  id int(11) not null auto_increment primary key,
  username varchar(255) not null,
  password char(32) not null
);

insert into users (username, password) values ('usagi', 'qwertyu123456789qwertyu123456789');
