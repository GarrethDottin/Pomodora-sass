class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,  :omniauthable, :omniauth_providers => [:facebook]
  # Setup accessible (or protected) attributes for your model
  attr_accessible :uid, :name, :provider,:email, :password, :password_confirmation, :remember_me, :name

  # def pomodoro
  #   if 1.days.ago < last_reset
  #     self.pomodoro = 0
  #     self.last_reset = Time.now
  #   end
  #   super
  # end

  # Change the time stamp so it checks to see if its been

  # has_secure_password validations: false

  def self.find_for_facebook_oauth(provider, uid, name, email, signed_in_resource=nil)
  user = User.where(:provider => provider, :uid => uid).first
  unless user
      user = User.create({:name => name,
                       :provider => provider,
                       :uid => uid,
                       :email => email,
                       :password => Devise.friendly_token[0,20],
                       :pomodoro => 3,
                       :last_reset => Time.now
                       }, :without_protection => true)

    end
    return user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["user_hash"]
        user.email = data["email"]
      end
    end
  end


  def password_required?
    super && provider.blank?
  end

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
      super
    end
  end
end