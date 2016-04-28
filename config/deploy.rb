# Define the name of the application
set :application, 'UTEP-News-Module'

# Define where can Capistrano access the source repository
# set :repo_url, 'https://github.com/[user name]/[application name].git'
set :scm, :git
set :repo_url, 'git@git.at.utep.edu:Web-Development/UTEP-News.git'


# Define where to put your application code
set :deploy_to, "/cygdrive/d/repo/UTEP-News-Module"

set :pty, true

set :format, :pretty

set :keep_releases, 1
