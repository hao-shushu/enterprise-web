;(function($){
$.fn.DB_gallery=function(options){
	var opt={
		thumWidth:126,             
		thumGap:9,                 
		thumMoveStep:6,           
		moveSpeed:300,             
		fadeSpeed:300,             
		end:8
	}
	$.extend(opt,options);
	return this.each(function(){
		var $this=$(this);
		var $imgSet=$this.find('.DB_imgSet');
		var $imgWin=$imgSet.find('.DB_imgWin');
		var $page=$this.find('.DB_page');
		var $pageCurrent=$page.find('.DB_current');
		var $pageTotal=$page.find('.DB_total');
		var $thumSet=$this.find('.DB_thumSet');
		var $thumMove=$thumSet.find('.DB_thumMove');
		var $thumList=$thumMove.find('li');
		var $nextBtn=$this.find('.DB_nextBtn');
		var $prevBtn=$this.find('.DB_prevBtn');
		var $nextPageBtn=$this.find('.DB_nextPageBtn');
		var $prevPageBtn=$this.find('.DB_prevPageBtn');
		var objNum=$thumList.length;
		var currentObj=0;
		var fixObj=0;
		var currentPage=0;
		var totalPage=Math.ceil(objNum/opt.thumMoveStep);  //向上取整
		var oldImg;

		init();

		function init(){
			setInit();
			setMouseEvent();
			changeImg();

		}

		function setInit(){
			$thumMove.append($('.DB_thumLine').get())
		}

		//���ε�
		function setMouseEvent(){
			$('.picture-list ul li').bind('click',function(e){
				var html = 	$(this).parents('ul').html()
				html = html +'<div class="DB_thumLine" style="left: 118px;"></div>'
				$('.DB_thumSet ul').html(html)
					$('.mask').show()
					currentObj=$(this).index();

					changeImg();	
			});
			$('.DB_thumMove').on('click','li',function(e){
				e.preventDefault();
				currentObj=$(this).index();
				changeImg();
			});
			$nextBtn.bind('click',function(){
				currentObj++;
				changeImg();
				currentPage=Math.floor(currentObj/opt.thumMoveStep);
				moveThum();

			});
			$prevBtn.bind('click',function(){
				currentObj--;
				changeImg();
				currentPage=Math.floor(currentObj/opt.thumMoveStep);
				moveThum();
			});
			$nextPageBtn.bind('click',function(){
				console.log(currentPage);
				currentPage++;
				moveThum();
			});
			$prevPageBtn.bind('click',function(){
				currentPage--;
				moveThum();
			});
			$('.close-pic').bind('click',function(){
				$('.mask').hide()
				$('.DB_thumSet ul').html()
			});
		
		}
		
		function moveThum(){
			var pos=((opt.thumWidth+opt.thumGap)*opt.thumMoveStep)*currentPage
			$thumMove.animate({'left':-pos},opt.moveSpeed);
			//
			setVisibleBtn();
		}

		function setVisibleBtn(){
			$prevPageBtn.show();
			$nextPageBtn.show();
			$prevBtn.show();
			$nextBtn.show();
			if(currentPage==0)$prevPageBtn.hide();
			console.log(currentPage,totalPage,'....');
			if(currentPage==totalPage-1)$nextPageBtn.hide();
			if(currentObj==0)$prevBtn.hide();
			if(currentObj==objNum-1)$nextBtn.hide();
		}

		function changeImg(){
			if($('.DB_thumMove li').length===0){return false}
			objNum=$thumMove.find('li').length
			totalPage=Math.ceil(objNum/opt.thumMoveStep)
			var $thum=$('.DB_thumMove li').eq(currentObj)
			var _src=oldImg=$thum.find('img').attr('src');
			$imgWin.children('img').hide().attr('src',_src).fadeIn(opt.fadeSpeed);
			oldImg=_src
			console.log($('.DB_thumLine'));
			$('.DB_thumLine').css({'left':$thum.position().left})
			$pageCurrent.text(currentObj+1);
			$pageTotal.text(objNum);
			
			setVisibleBtn();
		}
	})
}
})(jQuery)