$(document).on("ready", function() {
	  

	var Markit = {};
	/**
	* Define the QuoteService.
	* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
	* Second argument is fCallback, a callback function executed onSuccess of API.
	*/
	Markit.QuoteService = function(sSymbol, fCallback) {
	    this.symbol = sSymbol;
	    this.fCallback = fCallback;
	    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
	    this.makeRequest();
	};
	/**
	* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
	*/
	Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
	    this.fCallback(jsonResult);
	};
	/**
	* Ajax error callback
	*/
	Markit.QuoteService.prototype.handleError = function(jsonResult) {
	    console.error(jsonResult);
	};
	/** 
	* Starts a new ajax request to the Quote API
	*/
	Markit.QuoteService.prototype.makeRequest = function() {
	    //Abort any open requests
	    if (this.xhr) { this.xhr.abort(); }
	    //Start a new request
	    this.xhr = $.ajax({
	        data: { symbol: this.symbol },
	        url: this.DATA_SRC,
	        dataType: "jsonp",
	        success: this.handleSuccess,
	        error: this.handleError,
	        context: this
	    });
	};
	//grab value from input and update info on click
	$(".quote-form").submit(function(e){
		e.preventDefault();
		var symbol = ($(".quote-input").val());
		new Markit.QuoteService(symbol, function(jsonResult) {

		    //Catch errors
		    if (!jsonResult || jsonResult.Message){
		        console.error("Error: ", jsonResult.Message);
		        alert('please enter valid symbol!');
		        return;
		    }
		    console.log(jsonResult);
		    var volume = ((jsonResult.Volume)/100000).toFixed(1) + "M";
			var marketCap = ((jsonResult.MarketCap)/10000000000).toFixed(1) + "B";
			var time = new Date(jsonResult.Timestamp);
			var printTime = "As of " + time.getHours()+":"+time.getMinutes();
			var change = jsonResult.Change.toFixed(2);
			var changePercent = jsonResult.ChangePercent.toFixed(2);

		    $(".name").first().text(jsonResult.Name);
		    $(".form-name").first().text(jsonResult.Name);
		    $(".percents").first().text(change + "(" + changePercent + ")" + "%" );
		    $(".price").first().text(jsonResult.LastPrice);
		    $(".range").first().text(jsonResult.Low + "-" + jsonResult.High);
		    $(".open").first().text(jsonResult.Open);
		    $(".volume").first().text(volume);
		    $(".market-cap").first().text(marketCap);
		    $(".time").first().text(printTime);
		}); 
		$(".quote-input").val("");
	});
});