json.set! :current_user, current_user
json.follows @follows.all do |follow|
  json.follow follow
  json.opponent_user current_user.id == follow.from_user_id ? follow.to_user : follow.from_user
  json.messages follow.messages
end
