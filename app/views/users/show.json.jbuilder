json.set! :user, @user.as_json.merge(master_count: @user.master_count, disciple_count: @user.disciple_count)
json.set! :skills, @user.skills
json.set! :is_current_user, @is_current_user
json.set! :current_user, current_user
json.set! :no_accepted_disciple, @user.no_accepted_disciple
