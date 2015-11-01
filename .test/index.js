var
  fs= require( "fs"),
  dir= fs.readdirSync( __dirname)

for(var i in dir){
	var
	  file= dir[ i]
	if( !file.endsWith(".js")){
		continue
	}
	module.exports[ file]= require( "./"+ file)
}
