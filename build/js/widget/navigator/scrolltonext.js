!function(gmu,$,undefined){gmu.Navigator.options.isScrollToNext=!0,gmu.Navigator.option("isScrollToNext",!0,function(){var prevIndex,me=this;me.on("select",function(e,to,el){prevIndex===undefined&&(prevIndex=me.index?0:1);var listOffset,dir=to>prevIndex,target=$(el)[dir?"next":"prev"](),offset=target.offset()||$(el).offset(),within=me.$el.offset();(dir?offset.left+offset.width>within.left+within.width:offset.left<within.left)&&(listOffset=me.$list.offset(),me.$el.iScroll("scrollTo",dir?within.width-offset.left+listOffset.left-offset.width:listOffset.left-offset.left,0,400)),prevIndex=to})})}(gmu,gmu.$);