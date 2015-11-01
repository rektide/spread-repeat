var
  tape= require( "tape"),
  spreadRepeat= require( ".."),
  nth= require( "./fixture-nth-runs")

tape( "repeat free", function(t){
	t.plan(1)
	spreadRepeat( nth(0), nth(0), nth(0) ).then( function( res){
		t.equal (res.length, 3, "three immediate")
	}, function( err){
		t.error( err)
	})
})

tape( "repeat sequence", function( t){
	t.plan( 1)
	spreadRepeat( nth(0), nth(2), nth(1) ).then( function( res){
		t.equal( res.length, 3, "three sequences")
	}, function( err){
		t.error( err)
	})
})

tape( "repeat rungs", function( t){
	t.plan(1)
	spreadRepeat( nth( 3), nth( 0), nth( 4), nth( 2), nth( 1), nth( 4), nth( 2)).then( function(){
		t.pass( "all resolve eventually")
	}, function( err){
		t.error( err)
	})
})

tape( "repeat gap", function( t){
	t.plan( 1)
	spreadRepeat( nth( 3), nth( 0)).then( function(){
		t.fail( "should not have made progress")
	}, function( err){
		t.ok( err, "expected failure to make progress")
		t.end()
	})
})
