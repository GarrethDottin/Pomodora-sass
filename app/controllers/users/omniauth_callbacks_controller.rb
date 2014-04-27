module Users
  extend self
end
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # with this code you can see the data sent by facebook
    omniauth = request.env["omniauth.auth"]
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"].provider, request.env["omniauth.auth"].uid, request.env["omniauth.auth"].extra.raw_info.name, request.env["omniauth.auth"].info.email, current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Facebook"
      sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"].uid
      redirect_to :back
    end
   end
end

