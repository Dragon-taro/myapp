class Message < ApplicationRecord
  belongs_to :user
  belongs_to :follow, touch: true

  # User.find(1)が師匠、User.find(2)が弟子のとき
  # User.find(1).follows_to.find_by(from_user_id: 2).messages or User.find(2).follows_from.find_by(to_user_id: 1).messagesでメッセージを取得可能
end
