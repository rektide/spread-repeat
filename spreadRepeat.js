var Promise= require( "prfun")

function spreadRepeat(){
	var
	  args= arguments,
	  results= new Array( arguments.length),
	  was= arguments.length+ 1
	function attempt( n){
		var val= results[ n]
		if( val!== undefined&& (!val|| !val.then)){
			return true
		}
		val= results[ n]= args[ n]()
		val.then( function( result){
			results[ n]= result|| true
		}, function(){
			results[ n]= undefined
		})
		return !val.then
	}
	function iterate(){
		var
		  running= 0
		for( var i= 0; i< args.length; ++i){
			var
			  el= attempt( i)
			if( el!== true){
				++running
			}
		}
		if( running>= was){
			var err= new Error("No progress made")
			err.results= results
			return Promise.reject(err)
		}else if( running> 0){
			was= running
			return Promise.all(results).then( function(res){
				return res
			}, function(err){
				return iterate()
			})
		}else{
			return results
		}
	}
	return iterate()
}

module.exports= spreadRepeat
module.exports.spreadRepeat= spreadRepeat 
