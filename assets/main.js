/*!
 * Quant Dojo v0.9
 * Author: Mark Jensen
 *
 * Copyright 2015 TEMO Club
 *
 */

$( document ).ready(function() {
	
	$('[data-toggle="tooltip"]').tooltip(); 
	$( "#answer-1" ).focus();

	// Init event handlers
	$("#btnValidate").on('click.btnValidate', Kvant.init.validate);

	$("#btnNewSession").on('click.btnNewSession', Kvant.init.multiplication);
	$("#btnNewSession").click();
	
	$('#equations').on('keydown', 'input', Kvant.util.nextInput);
	
	$("#chkEstimate").click(function(){
		Kvant.estimated = $(this).prop('checked');
	});

	$("#vwMultiplication").click(function(){
		Kvant.util.changeSession('vwMultiplication');
		$('#session-title').text('Multiplication');
	});
	$("#vwDivision").click(function(){
		Kvant.util.changeSession('vwDivision');
		$('#session-title').text('Division');
	});
	$("#vwPercentage").click(function(){
		Kvant.util.changeSession('vwPercentage');
		$('#session-title').text('Percentage');
	});
	$("#vwAddition").click(function(){
		Kvant.util.changeSession('vwAddition');
		$('#session-title').text('Addition');
	});
	$("#vwSubtraction").click(function(){
		Kvant.util.changeSession('vwSubtraction');
		$('#session-title').text('Subtraction');
	});
	
});

var Kvant = {};
Kvant.data = [];
Kvant.estimated = false;

Kvant.util = {
	cleanup: function(){
		$( "#answer-1" ).focus();
		var elements = $("#equations tr");
			length = elements.length;
		for(var n=1; n < length; n++){
			elements[n].className = '';
			elements[n].children[3].children[0].value = '';
			elements[n].children[4].children[0].value = '';
		}
		Kvant.data = [];
	},
	changeSession: function(session){
		var menuElements = $('#mainmenu li');
		menuElements.each(function(){
			this.className='';
			if(this.id == session){
				this.className='active';
			}
		});	
		
		var methodName = session.substring(2).toLowerCase();
		$("#btnNewSession").off('click.btnNewSession');
		$("#btnNewSession").on('click.btnNewSession', Kvant.init[methodName]);
		$("#btnNewSession").click();	
	},
	nextInput: function(ev){
		if (event.which == 13) {
	        event.preventDefault();
	        var currBox = $(event.target),
	         	indexNum = parseFloat(currBox.attr('tabindex'));
	        $('[tabindex="' + (indexNum + 1).toString() + '"]').focus();
	    }
	}
};

Kvant.init = {
	
	validate: function(){
		var elements = $("#equations tr"),
			length = elements.length,
			success = false;
			
		for(var n=1; n < length; n++){
			elements[n].className = '';
			
			elements[n].children[3].children[0].value = Kvant.data[n-1];
		
			var guess = parseFloat(elements[n].children[4].children[0].value),
				answer = +Kvant.data[n-1];
			
			if(Kvant.estimated){
				var upperbound = answer * 1.10,
					lowerbound = answer * 0.90,
					success = (guess >= lowerbound && guess <= upperbound);
			}else{
				success = (guess == answer);				
			}
			
			if(success){
				$(elements[n]).addClass("success");
			}else{
				$(elements[n]).addClass("danger");
			}
		}
	},
	percentage: function(){
		Kvant.util.cleanup();
		
		var elements = $("#equations tr"),
			length = elements.length;
		
		for(var n=1; n < length; n++){
			
			var num1 = Math.floor((Math.random() * 1000) + 1),
				num2 = Math.floor((Math.random() * 200) + 1);
			
			elements[n].children[0].innerHTML = num1;
			elements[n].children[1].innerHTML = "X";
			elements[n].children[2].innerHTML = num2 + "%";
			
			console.log(num1, num2);
			
			Kvant.data.push((num1 * (num2/100)).toFixed(0));
		}
	},
	addition: function(){
		Kvant.util.cleanup();
		
		var elements = $("#equations tr"),
			length = elements.length;
		
		for(var n=1; n < length; n++){
			
			var num1 = Math.floor((Math.random() * 1000) + 1),
				num2 = Math.floor((Math.random() * 1000) + 1);
			
			elements[n].children[0].innerHTML = num1;
			elements[n].children[1].innerHTML = "+";
			elements[n].children[2].innerHTML = num2;
			
			Kvant.data.push(num1 + num2);
		}
	},
	
	subtraction: function(){
		Kvant.util.cleanup();
		
		var elements = $("#equations tr"),
			length = elements.length;
		
		for(var n=1; n < length; n++){
			
			var num1 = Math.floor((Math.random() * 1000) + 1);
				num2 = Math.floor((Math.random() * 1000) + 1);
				
			if(num1 > num2){
				elements[n].children[0].innerHTML = num1;
				elements[n].children[2].innerHTML = num2;
				Kvant.data.push(num1 - num2);
			}else{
				elements[n].children[0].innerHTML = num2;
				elements[n].children[2].innerHTML = num1;
				Kvant.data.push(num2 - num1);	
			}
			
			elements[n].children[1].innerHTML = "-";
		}
	},

	multiplication: function(){
		Kvant.util.cleanup();
		
		var elements = $("#equations tr");
			length = elements.length;
		
		for(var n=1; n < length; n++){
			
			var num1 = Math.floor((Math.random() * 1000) + 1);
				num2 = Math.floor((Math.random() * 1000) + 1);
			
			elements[n].children[0].innerHTML = num1;
			elements[n].children[1].innerHTML = "X";
			elements[n].children[2].innerHTML = num2;
			
			Kvant.data.push(num1 * num2);
		}		
	},
	
	division: function(){
		Kvant.util.cleanup();
		
		var elements = $("#equations tr");
			length = elements.length;
		
		for(var n=1; n < length; n++){
			
			var num1 = Math.floor((Math.random() * 1000) + 1);
				num2 = Math.floor((Math.random() * 1000) + 1);
			
			elements[n].children[0].innerHTML = num1;
			elements[n].children[1].innerHTML = "/";
			elements[n].children[2].innerHTML = num2;
			
			Kvant.data.push((num1 / num2).toFixed(2));
		}
	}
	
};