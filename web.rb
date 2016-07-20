require 'sinatra'
require 'slim'

get '/' do
  slim :doToday

end

get '/doToday' do
  slim :doToday
end

get '/collectionBox' do
  slim :collectionBox
end

get '/doTomorrow' do
  slim :doTomorrow
end

get '/dustbin' do
  slim :dustbin
end

get '/finished' do
  slim :finished
end

get '/schedule' do
  slim :schedule
end

get '/newAction' do
  slim :newAction
end

get '/taskDetails/:taskId' do
  slim :taskDetails ,locals:{id:params[:taskId]}
end

set :public_folder, File.dirname('css')
set :public_folder, File.dirname('js')
set :public_folder, File.dirname('fonts')
