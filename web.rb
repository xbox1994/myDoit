
require 'sinatra'
require 'mongo'
require 'json/ext'
require 'slim'
require 'json'
require 'date'

configure do
  set :mongo_db, Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'doit')

end

get '/' do
  slim :doToday
end

get '/doToday' do
  slim :doToday
end

get '/getTasksByType/:type' do
  settings.mongo_db['col'].find('type'=>params[:type]).to_a.to_json
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

post '/addTaskDetails' do
  setTypeByStartDate(params);
  settings.mongo_db['col'].insert_one(params);
end

get '/taskDetails/:_id' do
  slim :taskDetails ,locals:{_id:params[:_id]}
end

get '/getTaskDetailsBy_id/:_id' do
  settings.mongo_db['col'].find('_id'=>BSON::ObjectId(params[:_id])).to_a.to_json
end

post '/updateTaskDetails' do
  setTypeByStartDate(params);
  settings.mongo_db['col'].update_one({'_id'=>BSON::ObjectId(params[:_id])},
                                      {'$set'=>{type:params[:type],title:params[:title],description:params[:description], subTask:params[:subTask],startDate:params[:startDate],endDate:params[:endDate]}});
  status 201
  JSON.parse('{"hello": "goodbye"}')
end

get '/collections/?' do
  content_type :json
  settings.mongo_db.database.collection_names.to_json
end

put '/toFinished' do
  settings.mongo_db['col'].update_one({'_id'=>BSON::ObjectId(params[:_id])},
                                      {'$set'=>{type:'4'}});
  JSON.parse('{"hello": "goodbye"}')
end

put '/toDustbin' do
  settings.mongo_db['col'].update_one({'_id'=>BSON::ObjectId(params[:_id])},
                                      {'$set'=>{type:'5'}});
  JSON.parse('{"hello": "goodbye"}')
end

get '/emptyDustbin' do
  settings.mongo_db['col'].delete_many(:type=>'5');
  slim :dustbin
end

helpers do
  # a helper method to turn a string ID
  # representation into a BSON::ObjectId
  def object_id val
    begin
      BSON::ObjectId.from_string(val)
    rescue BSON::ObjectId::Invalid
      nil
    end
  end

  def document_by_id id
    id = object_id(id) if String === id
    if id.nil?
      {}.to_json
    else
      document = settings.mongo_db.find(:_id => id).to_a.first
      (document || {}).to_json
    end
  end
end

# list all documents in the test collection
get '/documents/?' do
  content_type :json
  settings.mongo_db['col'].find('type'=>'1').to_a.to_json
end

# find a document by its ID
get '/document/:id/?' do
  content_type :json
  document_by_id(params[:id])
end

set :public_folder, File.dirname('css')
set :public_folder, File.dirname('js')
set :public_folder, File.dirname('fonts')

def setTypeByStartDate (params)
  if(params[:startDate] == nil or params[:startDate] =='') then
    params["type"] = '0'
  elsif (Date.parse(params[:startDate]) - Date.today).to_i == 0 then
    params["type"] = '1'
  elsif (Date.parse(params[:startDate]) - Date.today).to_i == 1 then
    params["type"] = '2'
  else
    params["type"] = '3'
  end
end