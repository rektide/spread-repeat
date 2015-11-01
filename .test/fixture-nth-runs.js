var tape= require( "tape")

function nthRuns( fails){
	if( fails === undefined){
		throw new Error("Need 'fails' an number of times to fail parameteR")
	}
	return function(){
		var resolve= fails-- <= 0
		return resolve ? Promise.resolve() : Promise.reject()
	}
}

module.exports= nthRuns

tape( "nthRuns can immediately resolve", function( t){
	t.plan(1)
	var factory= nthRuns(0)
	factory().then( function(){
		t.pass("resolve")
	})
})

tape( "nthRuns can resolve 2nd", function( t){
	t.plan(2)
	var factory= nthRuns(1)
	factory().catch( function(){
		t.pass("non-resolve")
		return factory().then( function(){
			t.pass("resolve")
		})
	})
})
