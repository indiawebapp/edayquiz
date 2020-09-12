//Get User Name
var myName="";
var rightAns="";
var Ques_No=0;
var Result='Not Attempted';
var ScoreCorrect=0;
var ScoreIncorrect=0;
var ScoreNotAttempted=0;
var ButtonClick='Enable';


AppInitialize()
function AppInitialize(){
    document.getElementById('Ques').style.display='none';
    document.getElementById('Option1').style.display='none';
    document.getElementById('Option2').style.display='none';
    document.getElementById('Option3').style.display='none';
    document.getElementById('Option4').style.display='none';
    document.getElementById('Announcement').style.display='none';
    document.getElementById('QuesNo').style.display='none';
    document.getElementById('Ans').style.display='none';
    document.getElementById('BtnPrevious').style.display='none';
    document.getElementById('BtnNext').style.display='none';
    document.getElementById('BtnFinish').style.display='none';
    document.getElementById('BtnReset').style.display='none';

}
async function GetData(Ques_No){
    const Ques=await fetch('Questions.csv');
    const data=await Ques.text();
    console.log(data);

    const myTable=data.split('\n').slice(1);
    const row=myTable[Ques_No];
    const columns=row.split(',');
    document.getElementById('Ques').textContent=columns[1];
    document.getElementById('QuesNo').textContent="Question "+(Ques_No+1)+' of ' +(myTable.length-1);
    document.getElementById('Option1').textContent=columns[2];
    document.getElementById('Option2').textContent=columns[3];
    document.getElementById('Option3').textContent=columns[4];
    document.getElementById('Option4').textContent=columns[5];
    
    rightAns=columns[6];
   
    if (Ques_No==0) {
        document.getElementById('BtnPrevious').style.display='none';
    } else{
        //document.getElementById('BtnPrevious').style.display='block';
    };
    if (Ques_No==myTable.length-2) {
        alert(myTable.length);
        document.getElementById('BtnNext').style.display='none';
        document.getElementById('BtnFinish').style.display='block';
        
    } else{
        document.getElementById('BtnNext').style.display='block';
    }
 }

 //***Reset Screen***
 function ResetScreen(){
    document.getElementById('Intro').style.display='none';
    document.getElementById('secondCaption').style.display='none';
    document.getElementById('inputDefault').style.display='none';
    document.getElementById('QuesNo').style.display='block';
    document.getElementById('Ques').style.display='block';
    document.getElementById('Option1').style.display='block';
    document.getElementById('Option2').style.display='block';
    document.getElementById('Option3').style.display='block';
    document.getElementById('Option4').style.display='block';
    document.getElementById('Option1').className="btn btn-success btn-sm btn-block";
    document.getElementById('Option2').className="btn btn-success btn-sm btn-block";
    document.getElementById('Option3').className="btn btn-success btn-sm btn-block";
    document.getElementById('Option4').className="btn btn-success btn-sm btn-block";
    document.getElementById('rightAns').textContent='';
    document.getElementById('BtnStart').style.display='none';
    document.getElementById('BtnPrevious').style.display='none';
    document.getElementById('BtnNext').style.display='block';
    document.getElementById('BtnFinish').style.display='none';
    document.getElementById('BtnReset').style.display='none';
    document.getElementById('Announcement').style.display='none';
    document.getElementById('Ans').style.display='none';
    Result='Not Attempted'
}

document.getElementById('BtnStart').addEventListener('click',callStartQuestion);

function callStartQuestion(){
    myName=document.getElementById("inputDefault").value
    if (myName.trim()=="") {
        //alert('Please enter youe name to proceed.')
        var pos = myName.indexOf(" ");
        if (pos<11) {
            document.getElementById("inputDefault").value=myName.slice(1,pos);
        } else {
            document.getElementById("inputDefault").value=myName.slice(1,10);
        }
        document.getElementById('Announcement').style.display='Block';
        document.getElementById('Announcement').style.color='#C62828';
        document.getElementById('Announcement').textContent='Please enter your name to proceed.';
    }else{
        ResetScreen();
        Ques_No=0;
        GetData(Ques_No);
    }
}

document.getElementById('BtnNext').addEventListener('click',callNextQuestion);

function callNextQuestion(){
    ButtonClick='Enable';
    UpdateScore();
    ResetScreen();
    Ques_No++;
    GetData(Ques_No);
    document.getElementById('QuesNo').textContent=cnt;
}

document.getElementById('BtnPrevious').addEventListener('click',callPreviousQuestion);

function callPreviousQuestion(){
    ResetScreen();
    Ques_No--;
    GetData(Ques_No);
    document.getElementById('QuesNo').textContent=cnt;
}

document.getElementById('BtnFinish').addEventListener('click',callFinish);

function callFinish(){
    UpdateScore();
    document.getElementById('PageHeading').style.display='none';
    document.getElementById('Intro').style.display='block';
    document.getElementById('Intro').textContent="Certificate of Achievement"
    document.getElementById('secondCaption').style.display='none';
    document.getElementById('inputDefault').style.display='none';
    document.getElementById('Ques').style.display='block';
    document.getElementById('Ques').style.marginTop='100px';
    document.getElementById('Ques').fontsize=24;
    document.getElementById('BtnReset').style.display='block';
    var TotalQues=(ScoreCorrect+ScoreIncorrect);
    var percent=(ScoreCorrect/TotalQues)*100;

    if (percent>0.7) {
        document.getElementById('Ques').textContent='Congratulations! ' + myName +', you have correctly answered ' + ScoreCorrect + ' questions out of ' + TotalQues +'.';
    } else if(0) {
        document.getElementById('Ques').textContent='Sorry! ' + myName +', you have failed. You have scored ' + percent.toFixed(2) +'.';
    } else{
        document.getElementById('Ques').textContent='Sorry, we could not generate the final score for you.'
    }
    

    document.getElementById('Option1').style.display='none';
    document.getElementById('Option2').style.display='none';
    document.getElementById('Option3').style.display='none';
    document.getElementById('Option4').style.display='none';
    document.getElementById('BtnStart').style.display='none';
    document.getElementById('BtnPrevious').style.display='none';
    document.getElementById('BtnFinish').style.display='none';
    document.getElementById('Announcement').style.display='none';
    document.getElementById('QuesNo').style.display='none';
    document.getElementById('Ans').style.display='none';
    Result='Not Attempted'

}

document.getElementById('BtnReset').addEventListener('click',callReset);

function callReset(){
    location.reload();
}

document.getElementById('Option1').addEventListener('click',callCheckOption1);
document.getElementById('Option2').addEventListener('click',callCheckOption2);
document.getElementById('Option3').addEventListener('click',callCheckOption3);
document.getElementById('Option4').addEventListener('click',callCheckOption4);

function callCheckOption1(){
    if(document.getElementById('Option1').className=="btn btn-success btn-sm btn-block"){
   
    var myAns=document.getElementById('Option1').innerHTML;
    document.getElementById('Announcement').style.display='Block';
    
    //Disable other options
    document.getElementById('Option2').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option3').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option4').className="btn btn-secondary btn-sm btn-block";
    
    if (rightAns.trim()==myAns.trim()) {
        Result='Correct';
        document.getElementById('Announcement').textContent='That\'s correct, '+ myName ;
        document.getElementById('Announcement').style.color='green';
        document.getElementById('Option1').className="form-control is-valid btn-sm"
        
       // document.getElementById('Option1').className="btn btn-success btn-sm btn-block"
    } else{
        Result='In-Correct';
        document.getElementById('Announcement').textContent='O '+myName+'! you missed it. Please try again';
        document.getElementById('Announcement').style.color='#C62828';
        document.getElementById('Option1').className="form-control is-invalid btn-sm"
        document.getElementById('rightAns').textContent='Correct Answer is '+rightAns;
    }
}
    
}

function callCheckOption2(){

    if(document.getElementById('Option2').className=="btn btn-success btn-sm btn-block"){
    var myAns=document.getElementById('Option2').innerHTML;
    document.getElementById('Announcement').style.display='Block';

    //Disable other options
    document.getElementById('Option1').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option3').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option4').className="btn btn-secondary btn-sm btn-block";
    if (rightAns.trim()==myAns.trim()) {
        Result='Correct'
        document.getElementById('Announcement').textContent='Great '+myName+'! you are a genius';
        document.getElementById('Announcement').style.color='green';
        document.getElementById('Option2').className="form-control is-valid btn-sm"
    } else{
        Result='In-Correct';
        document.getElementById('Announcement').textContent='O '+myName+'! you missed it. Please try again';
        document.getElementById('Announcement').style.color='#C62828';
        document.getElementById('Option2').className="form-control is-invalid btn-sm"
        document.getElementById('rightAns').textContent='Correct Answer is '+rightAns;
    }
}
}

function callCheckOption3(){

    if(document.getElementById('Option3').className=="btn btn-success btn-sm btn-block"){
    var myAns=document.getElementById('Option3').innerHTML;
    document.getElementById('Announcement').style.display='Block';

    //Disable other options
    document.getElementById('Option1').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option2').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option4').className="btn btn-secondary btn-sm btn-block";
    if (rightAns.trim()==myAns.trim()) {
        Result='Correct';
        document.getElementById('Announcement').textContent='Super '+myName+'! you have got it right';
        document.getElementById('Announcement').style.color='green';
        document.getElementById('Option3').className="form-control is-valid btn-sm"
    } else{
        Result='In-Correct';
        document.getElementById('Announcement').textContent='Sorry '+myName+' .That\'s not correct';
        document.getElementById('Announcement').style.color='#C62828';
        document.getElementById('Option3').className="form-control is-invalid btn-sm"
        document.getElementById('rightAns').textContent='Correct Answer is '+rightAns;
    }
}
}

function callCheckOption4(){

    if(document.getElementById('Option4').className=="btn btn-success btn-sm btn-block"){
    var myAns=document.getElementById('Option4').innerHTML;
    document.getElementById('Announcement').style.display='Block';

    //Disable other options
    document.getElementById('Option1').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option2').className="btn btn-secondary btn-sm btn-block";
    document.getElementById('Option3').className="btn btn-secondary btn-sm btn-block";

    if (rightAns.trim()==myAns.trim()) {
        Result='Correct';
        document.getElementById('Announcement').textContent='Wow '+myName+'! you have got it right';
        document.getElementById('Announcement').style.color='green';
        document.getElementById('Option4').className="form-control is-valid btn-sm"
    } else{
        Result='In-Correct';
        document.getElementById('Announcement').textContent='Sorry, that\'s not correct. Please try again';
        document.getElementById('Announcement').style.color='#C62828';
        document.getElementById('Option4').className="form-control is-invalid btn-sm"
        document.getElementById('rightAns').textContent='Correct Answer is '+rightAns;
    }
}
}

function UpdateScore(){
//Check Result
 if (Result.trim()=='Correct') {
    ScoreCorrect++;
    document.getElementById("CorrectAns").innerHTML=ScoreCorrect;   
 } else if(Result.trim()=='In-Correct') {
    ScoreIncorrect++;
    document.getElementById("WrongAns").innerHTML=ScoreIncorrect;   
 } else{
    ScoreNotAttempted++;
    document.getElementById("NotAttempted").innerHTML=ScoreNotAttempted;
 }
 //Reset Results
    Result='Not Attempted';
}



