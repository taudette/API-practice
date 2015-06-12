$(document).on('ready', function() {
  
});

// API at http://dev.markitondemand.com/#stockquote

$.ajax({
    dataType:'jsonp',
    url:'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=AAPL',
    success:function(data) {
    	var volume = ((data.Volume)/100000).toFixed(1) + 'M';
    	var marketCap = ((data.MarketCap)/10000000000).toFixed(1) + 'B';
    	var time = new Date(data.Timestamp);
    	var printTime = 'As of ' + time.getHours()+':'+time.getMinutes();
		$('.name').html(data.Name);
		$('.name').html(data.Name);
		$('.range').html(data.Low + ' - ' + data.High);
		$('.open').html(data.Open);	
		$('.volume').html(volume);	
		$('.market-cap').html(marketCap);	
		$('.time').html(printTime);
    }
});

