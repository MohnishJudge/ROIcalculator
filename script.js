let depreciationRateYesBtn = document.getElementById('depreciationRateYesBtn');
let depreciationRateYesDiv = document.getElementById('depreciationRateYesDiv');
let depreciationRateNoBtn = document.getElementById('depreciationRateNoBtn');
let depreciationRateNoDiv = document.getElementById('depreciationRateNoDiv');
let depreciationRateChoice;

let appreciationRateYesBtn = document.getElementById('appreciationRateYesBtn');
let appreciationRateYesDiv = document.getElementById('appreciationRateYesDiv');
let appreciationRateNoBtn = document.getElementById('appreciationRateNoBtn');
let appreciationRateNoDiv = document.getElementById('appreciationRateNoDiv');
let appreciationRateChoice;


function depreciationRateYes() {
    depreciationRateYesDiv.style.display = 'block';
    depreciationRateNoDiv.style.display = 'none';

    depreciationRateNoBtn.style.backgroundColor = '#504f4f';
    depreciationRateYesBtn.style.backgroundColor = '#792626';

    depreciationRateChoice = true;
}

function depreciationRateNo() {
    depreciationRateNoDiv.style.display = 'block';
    depreciationRateYesDiv.style.display = 'none';

    depreciationRateYesBtn.style.backgroundColor = '#504f4f';
    depreciationRateNoBtn.style.backgroundColor = '#792626';

    depreciationRateChoice = false;
}

function appreciationRateYes() {
    appreciationRateYesDiv.style.display = 'block';
    appreciationRateNoDiv.style.display = 'none';

    appreciationRateNoBtn.style.backgroundColor = '#504f4f';
    appreciationRateYesBtn.style.backgroundColor = '#792626';

    appreciationRateChoice = true;
}

function appreciationRateNo() {
    appreciationRateNoDiv.style.display = 'block';
    appreciationRateYesDiv.style.display = 'none';

    appreciationRateYesBtn.style.backgroundColor = '#504f4f';
    appreciationRateNoBtn.style.backgroundColor = '#792626';

    appreciationRateChoice = false;
}

function calculate() {
    let purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    let downPayment = parseFloat(document.getElementById('downPayment').value);
    let annualRent = parseFloat(document.getElementById('annualRent').value);
    let operatingExpenses = parseFloat(document.getElementById('operatingExpenses').value);
    let principalInterest = parseFloat(document.getElementById('principalInterest').value);
    let firstYearInterest = parseFloat(document.getElementById('firstYearInterest').value);
    let taxBracketRate = parseFloat(document.getElementById('taxBracketRate').value);

    let depreciationRate;
    if(depreciationRateChoice) {
        let personalProperty = parseFloat(document.getElementById('personalProperty').value);
        let building = parseFloat(document.getElementById('building').value);
        let landImprovement = parseFloat(document.getElementById('landImprovement').value);

        let depreciation1 = personalProperty * 0.2;
        let depreciation2 = building * 0.0348;
        let depreciation3 = landImprovement * 0.05;
        depreciationRate = depreciation1 + depreciation2 + depreciation3;
    }
    else {
        depreciationRate = 0.036 * purchasePrice;
    }

    let appreciationRate;
    if(appreciationRateChoice) {
        appreciationRate = parseFloat(document.getElementById('appreciationRate').value);
    }
    else {
        appreciationRate = 3.5;
    }

    let annualDebtService = principalInterest * 12;
    let grossOperatingIncome = annualRent * 0.95;
    let netOperatingIncome = grossOperatingIncome - operatingExpenses;
    let cashFlowBeforeTax = netOperatingIncome - annualDebtService;
    let principleReduction = annualDebtService - firstYearInterest;
    let taxableIncome = netOperatingIncome - firstYearInterest - depreciationRate;
    let taxPaid = taxableIncome * (taxBracketRate / 100);

    let roiWithout = (cashFlowBeforeTax + principleReduction - taxPaid) / downPayment;
    let roiWith = (appreciationRate / 100) + roiWithout;
    roiWithout *= 100;
    roiWith *= 100;

    let roiWithoutLabel = document.getElementById('roiWithoutLabel');
    let roiWithLabel = document.getElementById('roiWithLabel');
    roiWithoutLabel.innerHTML = 'ROI without appreciation: ' + roiWithout.toFixed(2).toString() + '%';
    roiWithLabel.innerHTML = 'ROI with appreciation: ' + roiWith.toFixed(2).toString() + '%';
}

function onLoad() {
    depreciationRateYes();
    appreciationRateYes();
}