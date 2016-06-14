# Define server(s)
server 'volt.utep.edu', roles: [:web], user: fetch(:username)

set :stage, :production

namespace :deploy do

  desc "Copy to all the folders that need the file"
  ask(:username, nil, echo: true)
  ask(:password, nil, echo: false)

  # Change permission of shell script to user that is executing the deploy
  # execute "chown" + fetch(:username) + ":'Domain Users' /tmp/Chernobyl"

  task :change_ownership do
  end
  task :update_template do
    on fetch(:username) + "@volt.utep.edu" do
      #UTEP News
      # Delete first
      execute "rm -rf /cygdrive/d/Projects/utep/modules/mod_utepnews/*"
      execute "yes | cp -rf #{current_path}/* /cygdrive/d/Projects/utep/modules/mod_utepnews/"
    end
  end

  after :deploy, 'deploy:update_template'
end

# SSH Options
# See the example commented out section in the file
# for more options.
set :ssh_options, {
    forward_agent: false,
    auth_methods: %w(password),
    password: fetch(:password),
    user: fetch(:username)
}
