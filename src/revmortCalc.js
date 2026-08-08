var dbug = !true;
var fcs = {
	"paymentAmnt" : null,
	"interestRate" : null,
	"amort" : null,
	"amortOutput" : null,
	"calcBtn" : null,
	"resultsOutput" : null,
	"fortnight" : null,
	"month" : null,
		/*
	"retirementIncome" : null,
	 */
}
function init () {
	if (dbug) console.log ("initting...");
	try {
		for (var control in fcs) {
			fcs[control] = document.getElementById(control);
			if (control == "paymentAmnt" || control == "interestRate" || control == "amort") {
				fcs[control].addEventListener("change", calculate, false);
			} else if (control == "calcBtn") {
				fcs[control].addEventListener("click", calculate, false);
			} else if (false && dbug && (control == "month" || control == "fortnight")) {
				console.log (control + ": " + fcs[control].checked +".");
			}
		}
		fcs["amortOutput"].textContent = fcs["amort"].value;
	}
	catch (ex) {
		console.error ("Caught exception: " + ex.message);
	}
	if (dbug) console.log ("inited.");
} // End of init

function calculate () {
	if (dbug) console.log ("Calculating....");
	let paymentPeriod = (fcs["month"].checked ? 12 : 26);
	
	let payment = fcs["paymentAmnt"].value;
	let c = fcs["interestRate"].value /(paymentPeriod * 100);
	let d = (c+1);
	let n = fcs["amort"].value * paymentPeriod;
	fcs["amortOutput"].textContent = fcs["amort"].value;
	if (dbug) {
		console.log ("Calculating payment of $" + payment + " at interest rate of " + c + "% for " + n + " " + paymentPeriod + ".");
		console.log ("d: " + d + ".");
		console.log ("d^n: " + d**n + ".");
	}
	let L = (payment *(((1+c)**n)-1))/(c*(1+c)**n);
	fcs["resultsOutput"].innerHTML = L.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
	if (dbug) console.log ("Calculated $" + L);

} // End of calculate
