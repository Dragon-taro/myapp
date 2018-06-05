json.set! :user, current_user.as_json.merge(master_count: current_user.master_count, disciple_count: current_user.disciple_count)
json.set! :skills, current_user.skills
json.set! :no_accepted_disciple, current_user.no_accepted_disciple
