json.users @users.all do |user|
  json.id user.id
  json.name user.name
  json.image user.image
  json.description user.description
  json.master_count user.master_count
  json.disciple_count user.disciple_count
  json.skill_list user.skill_list
end
