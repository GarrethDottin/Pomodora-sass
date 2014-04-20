class UsersController < ApplicationController
  def index
    if params[:id] != nil
      @user =User.find_by (params[:id])
    end
    if @user == nil
      @user = User.new
    end
  end
  def create
    @user = User.create(user_params)
    @user.pomodoro = 3
    @user.save!
    session[:user_id] = @user.id
    redirect_to(controller: 'names', id: @user.to_param)
  end

  def increment
    @user = User.find_by (params[:id])
    @user.increment(:pomodoro,by = 1)
    @user.save!
    render :nothing => true
  end


  private

  def user_params
        params.require(:user).permit(:name, :password, :remember_me, :email)
  end
end
