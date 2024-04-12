## アプリケーション名
destinynumbers2

## アプリケーション概要
数秘術占いができ結果を見ることができます。

## URL
https://destinynumbers2.onrender.com/

## テスト用アカウント

Basic認証パスワード：admin

Basic認証ID：2222

ニックネーム：テスト

メールアドレス：test0000@mail.com

パスワード：A11111

## 利用方法
1.トップページのヘッダーからユーザー新規登登録を行う

2.トップページにある名前を入力する

3.生年月日を選択する

4.占うボタンをクリックする

[![Image from Gyazo](https://i.gyazo.com/bb5b00513bbe5a6271a179dd31da0398.gif)](https://gyazo.com/bb5b00513bbe5a6271a179dd31da0398)

## 機能一覧
数秘術占い機能

## アプリケーションを作成した背景
数秘術占いが好きで手軽に数秘術占いができるサービスが欲しいと思いました。

数秘術占いは生年月日が分かれば占えるので、占いに興味がない人でも手軽に占うことができます。

このアプリで数秘術占いに興味を持ってもらうことを目的として作成しました。

## 実装予定の機能
・コラムページ実装(詳細な各占い結果の解説)

・相性占い機能

## データベース設計
[![Image from Gyazo](https://i.gyazo.com/9b8c73b1ecfb8b926179d3dfbaee9048.png)](https://gyazo.com/9b8c73b1ecfb8b926179d3dfbaee9048)
## 画面推移図
[![Image from Gyazo](https://i.gyazo.com/6040e4c30a725ddbfdd0beba1e2a6dad.png)](https://gyazo.com/6040e4c30a725ddbfdd0beba1e2a6dad)

## 開発環境
フロントエンド

・HTML

・css

・JavaScript

・Bootstrap

バックエンド

・Ruby

## ローカルでの動作方法
% git clone https://github.com/ayanosato03/destinynumbers2.git

% cd quiz-square

% yarn

% yarn dev

## 工夫した点
占い結果ページの見やすさ、解説の読みやすさについて工夫をしました。

アプリ作成の目的として占いに興味がない人でも手軽に占うことができるということを挙げているので

解説についてはあまり長くせずに要点をまとめて分かりやすく伝えることを意識しています。

今後はコラムページを実装し深堀した内容の解説を掲載する予定です。

また、知人に実際に利用してもらい、ユーザーヒアリングを行いながら改善を行っています。

# テーブル設計

## users テーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| nickname           | string | null: false |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false |

### Association
- has_many :results

## results テーブル
| Column             | Type        | Options     |
| ------------------ | ----------- | ----------- |
| name               | string      | null: false |
| birthday           | date        | null: false |
| calculation_result | integer     | null: false |
| user               | references  | null: false, foreign_key:true |

### Association
- belongs_to :user