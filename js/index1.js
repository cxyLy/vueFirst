$(function(){
	//轮播
	$.ajax({
		type:"get",
		url:"1.json",
		async:true,
		success:function(res){
//			console.log(res.data.sections);
			setData(res.data.gallery);
			setSection(res.data.sections[0].body.items);
			setShoppingList(res.data.sections);
		}
	});
	function setData(arr){
		if(!(arr instanceof Array)){
			return;
		}
		$('.slider-wrap').append($("<img src="+ arr[arr.length-1].img_url+" />"));
		for (var i = 0; i < arr.length; i++) {
			var imgObj = $("<img />");
			imgObj.attr('src',arr[i].img_url);
			$('.slider-wrap').append(imgObj);
		}
		var imgObj0 = $("<img src="+ arr[0].img_url+" />");
		$('.slider-wrap').append(imgObj0);
	}
	var i = 1;
	$('.slider-wrap').css('margin-left',-16 + 'rem');
	$('.slider-nav').find('span').eq(0).css('background','black');
	function setSlider(){
		i++;
//		console.log(i)
		if(i==6){
			$('.slider-wrap').css('margin-left',0);
			i = 1;
		}
		$('.slider-wrap').animate({
			'margin-left': -16*i + 'rem'
		},600)
		$('.slider-nav').find('span').css('background','white');
		$('.slider-nav').find('span').eq(i-1).css('background','black');
	}
	var timer = setInterval(setSlider,2000);
	touch.on('.slider-wrap','swipeleft',function(){
		clearInterval(timer);
		i++;
//		console.log(i);
		if(i == 6){
			$('.slider-wrap').css('margin-left',0);
			i=1;
		}
		$('.slider-nav').find('span').css('background','white');
		$('.slider-nav').find('span').eq(i-1).css('background','black');
		$(this).parent().animate({
			'margin-left': -16*i + 'rem'
		},300,function(){
			timer = setInterval(setSlider,2000);
		})
	})
	touch.on('.slider-wrap','swiperight',function(){
		clearInterval(timer);
		i--;
//		console.log(i);
		if(i == -1){
			$('.slider-wrap').css('margin-left',-80 + 'rem');
			i = 4;
		}
		$('.slider-nav').find('span').css('background','white');
		$('.slider-nav').find('span').eq(i-1).css('background','black');
		$(this).parent().animate({
			'margin-left': -16*i + 'rem'
		},300,function(){
			timer = setInterval(setSlider,2000);
		})
	})
	//设置图片列表
	
	function setSection(arr){
		var arrAllImg = [];
		var pos = 0;
		for (var i = 0; i < arr.length; i++) {
			var imgObj = $("<img src="+arr[i].img_url + "/>");
//			$('.pic-section').append(imgObj);
			arrAllImg.push(imgObj);
			imgObj.on('load',function(){
				pos++;
				console.log(pos)
				if(pos == arr.length){
					for (var j = 0; j < arrAllImg.length; j++) {
						$('.pic-section').append(arrAllImg[j]);
					}
				}
			})
		}
	}
	
	//详细信息列表
	function setShoppingList(arr){
		for (var i = 1; i < arr.length; i++) {
			if(arr[i].body.items.length ==1){
				var liObj = $("<li><div class='img'><img/></div><div class='info'><p></p><p></p><p></p></div></li>");
				liObj.find('.img').find('img').attr('src',arr[i].body.items[0].img_url);
				liObj.find('.info').find('p').eq(0).text(arr[i].body.items[0].product_name);
				liObj.find('.info').find('p').eq(1).text(arr[i].body.items[0].product_brief);
				liObj.find('.info').find('p').eq(2).text(arr[i].body.items[0].product_price);
				$('.list-section ul').append(liObj);
			}
			if(arr[i].body.items.length ==2){
				var liObj2 = $("<li class='last'><div><img/><img/></div></li>");
				liObj2.find('img').eq(0).attr('src',arr[i].body.items[0].img_url);
				liObj2.find('img').eq(1).attr('src',arr[i].body.items[1].img_url);
				$('.list-section ul').append(liObj2);
			}
		}
	}
	
	//tab切换
	$('.footer').find('a').eq(0).css('color','#F56A00');
	$('#wrap>div').css('display','none');
	$('.home').css('display','block');
	touch.on('.footer a','touchstart',function(){
		$(this).parent().parent().children().css('color','#878787');
		$(this).parent().css('color','#F56A00');
		$('#wrap>div').css('display','none');
		$('#wrap').children('div').eq($(this).parent().index()).css('display','block');
	})
	
	//分类页面
	$.ajax({
		type:"get",
		url:"2.json",
		async:true,
		success:function(res){
			console.log(res.data.list);
			setcategroy(res.data.list);
		}
	});
	function setcategroy(arr){
		for (var i = 0; i < arr.length; i++) {
			divObj = $('<div><h3></h3><ul></ul></div>');
			divObj.find('h3').text(arr[i].name);
			for (var j = 0; j < arr[i].list.length; j++) {
				liObj = $('<li><figure><img/><figcaption></figcaption></figure></li>');
				liObj.find('figure').find('img').attr('src',arr[i].list[j].img_url);
				liObj.find('figure').find('figcaption').text(arr[i].list[j].name);
				divObj.find('ul').append(liObj);
			}
			$('.categroy-wrap').append(divObj);
		}
	}
	//头部点击事件
	touch.on('.head-left a','tap',function(){
		$(this).parent().parent().parent().parent().css('display','none');
		$('.home').css('display','block');
		$('.footer a').css('color','#878787');
		$('.footer a').eq(0).css('color','#F56A00');
	})
	//全部商品点击事件
	touch.on('.all-commodity','tap',function(){
		$(this).parent().parent().parent().parent().css('display','none');
		$('.categroy').css('display','block');
		$('.footer a').css('color','#878787');
		$('.footer a').eq(1).css('color','#F56A00');
	})
})



























