class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:twitter]

  has_many :skills

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
end
