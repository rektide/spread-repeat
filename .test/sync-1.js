var
  spreadRepeat= require( ".."),
  tape= require("tape"),
  nth= require( "./fixture-nth-runs")

tape( "synchronous only", function( t){
	t.plan( 1)
	var val= spreadRepeat( function(){ return 2}, function(){ return 3})
	t.deepEqual(val, [2, 3], "expected values")
})

tape( "synchronous with async", function(t){
	t.plan(1)
	spreadRepeat( nth( 0), nth( 1), function(){ return 5}).then( function( res){
		t.deepEqual (res.length, 3, "three immediate")
	}, function( err){
		t.error( err)
	})
})

