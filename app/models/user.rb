class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:twitter]

  has_many :skills
  has_many :messages

  accepts_nested_attributes_for :skills, allow_destroy: true

  # N:Nの自己結合
  has_many :follows_from, class_name: Follow, foreign_key: :from_user_id, dependent: :destroy
  has_many :follows_to,   class_name: Follow, foreign_key: :to_user_id,   dependent: :destroy
  has_many :master, through: :follows_from, source: :to_user
  has_many :disciple,  through: :follows_to,   source: :from_user

  def self.from_omniauth(auth)
    find_or_create_by(provider: auth["provider"], uid: auth["uid"]) do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.username = auth["info"]["nickname"]
      user.name = auth["info"]["name"]
      user.description = auth["info"]["description"]
      user.image = auth["info"]["image"]
      user.email = User.dummy_email(auth)
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"]) do |user|
        user.attributes = params
      end
    else
      super
    end
  end

  def accepted_disciple
    follows_to.map{|follow| follow.from_user if follow.is_accept}.compact
  end

  def no_accepted_disciple
    follows_to.map{|follow| follow.from_user unless follow.is_accept}.compact
  end

  def accepted_master
    follows_from.map{|follow| follow.to_user if follow.is_accept}.compact
  end

  def no_accepted_master
    follows_from.map{|follow| follow.to_user unless follow.is_accept}.compact
  end

  def master_count
    accepted_master.length
  end

  def disciple_count
    accepted_disciple.length
  end

  def self.dummy_email(auth)
    "#{auth.uid}-#{auth.provider}@example.com"
  end

  def skill_list
    skills.pluck(:language)
  end

end
