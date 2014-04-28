set :output, "/log/cron.log"

every 1.day, at: "12:00am" do
  rake "db:reset_pomodoro", :output => {:error => 'error.log', :standard => 'cron.log'}
end