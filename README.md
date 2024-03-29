# テーブル設計

## users テーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| name               | string | null: false |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false |
| birthday           | date   | null: false |

### Association
- has_many :results

## results テーブル
| Column             | Type        | Options     |
| ------------------ | ----------- | ----------- |
| calculation_result | string      | null: false |
| user               | references  | null: false, foreign_key:true |

### Association
- belongs_to :user