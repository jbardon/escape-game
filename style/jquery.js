var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

var louis=1;

$(document).ready(function(){
/*
  $('#test > button').click(() => {
    const perso = ['1', '2', '3', '4'];
    perso.forEach(perso => {
      const line =  `<div id="${perso}">${perso}</div>`;
      $('#test').append(line)
    })
  })
*/

  /*--------- Mouse on --------*/
  $(".menu p,.chatName p").mousemove(function () {
    $(this).addClass("mouseOn");
  });
  $(".menu p,.chatName p").mouseout(function () {
    $(this).removeClass("mouseOn");
  });

  /*--------- Menu --------*/
  $("#hotel").click(function () {
    window.location.reload();
  })

  $("#passChapter1, #taxi").click(function(){
    $(".dialogButton1").click();
    $(".chatBody").children("div").hide(); /*hide all dialog*/
    $("#TaxiDialog").show();
    $("#passChapter1, #LouisOnCall, #TaxiOnCall, .cellphone, .locker").hide();
  })

  $("#passChapter2, #club").click(function () {
   $("#passChapter1, .dialogButton2").click();
   $(".chatBody").children("div").hide(); /*hide all dialog*/
   $("#EroDialog").show();
    $("#passChapter2, #LouisOnCall, #TaxiOnCall, #LouisDialog4,#LouisDialog5,#LouisDialog6").hide();
  });

  /*--------- Chat Name --------*/
  $(".chatName p").click(function () {
    $(".chatBody").children("div").hide(); /*hide all dialog*/
    $(".chatName img").hide();
    $("#" + this.id.substr(4) + "Dialog").show();
    $(".chatBody").scrollTop($(".chatBody").prop("scrollHeight"), 100);
  });

  /*--------- click button --------*/
  $(".dialogButton1, .dialogButton2").click(function(){
    $(this).hide();/* hide button */
    var whichDialog=this.id.substr(4);
    if (whichDialog!='ubButton'){
      var name = whichDialog.substring(0, whichDialog.length - 7);
      $("#"+whichDialog).show();/* show dialog */
      $("#name" + name).show();
      if ($(this).parent().parent("div").filter("#" + name + "Dialog").length == 0) /* if it's not in the same chat */
        { $("#" + name + "OnCall").show();} 
      $(this).prev().hide();/* hide br */

      if (whichDialog == "TaxiDialog1") { 
        $("#taxi,#passChapter2").show();
        $("#passChapter1").hide();
      }
    }else{
      $(".cellphone, .locker, #club").show();
      $("#goClubButton, #passChapter2,#showLouisDialog6").hide();
    }
  });
  

  /*-- phone --*/
  $("#phoneTable img").mousedown(function () {
    $(this).addClass("clickNumber");
  });
  $("#phoneTable img").mouseup(function () {
    $(this).removeClass("clickNumber");
  });

  $("#phoneTable img:not('#deleteNumber')").click(function(){
    if(this.id!="callNumber"){
      $("#phoneNumber").append(this.id.substr(1, 1));
      $("#deleteNumber").show();
    }
  });
  $("#deleteNumber").click(function(){
    var pN = $("#phoneNumber").text();
    $("#phoneNumber").text(pN.substring(0, pN.length - 1));
    if (pN.length == 1) { $("#deleteNumber").hide();}
  });
  $("#callNumber").click(function () {
    const phone = {
      "54135454": 'Louis',
      "54131123": "Lily",
      "54137814": 'Thomas',
      "54130373": 'Claire',
      "54139318": 'Maxime'
    }
    $(".chatBody").children("div").hide(); /*hide all dialog*/
    if (phone[$("#phoneNumber").text()]){
      nameStr = phone[$("#phoneNumber").text()];

      if (nameStr == "Louis") {
        $(".chatBody").children("div").hide(); /*hide all dialog*/
        $("#LouisDialog").show();

        $("#LouisOnCall").show();

        $("#newCallLouis").text("喂？有什么事吗？我这边有点忙，一会打给你。");
        $("#hangUpLouis").show();
      }
      else{
        $("#" + nameStr + "Dialog").show();
        $("#name" + nameStr).show();
        $("#" + nameStr + "OnCall").show();
      }
    }
    else{
      $("#faultNumberDialog").show();
      $("#faultNumberInfo").text("不存在 " + $("#phoneNumber").text() + " 这个电话号码。");
    }
    $(".hangUp").show();
    $("#phoneNumber").text("");
    $("#deleteNumber").hide();
  });


  $("#hangUpLouis").click(function () {
    $(this).hide();
    $("#nameLouisOnCall").hide();
    $("#nameLouis").show();
  });

  $(".hangUp").click(function () {
    $(this).hide();
    $(".onCallImage").hide();
  });


  /*-- locker --*/
  $(".code").click(function () {
    var name = this.id.substr().substring(0, this.id.substr().length - 5);
    var v = parseInt($(this).text())+1;
    if (v==10){v=0}
    $(this).text(v);

    $("#" + name + "Code1").css("background-color", "#eeeeee");
    $("#" + name + "Code2").css("background-color", "#eeeeee");
    $("#" + name + "Code3").css("background-color", "#eeeeee");
    $("#" + name + "Code4").css("background-color", "#eeeeee");
  });

  $(".tryCode").click(function () {
    const codes = {
      'Louis': '9411',
      'Juliette': '1504',
      'Thomas': '0409',
      'Lily': '1994',
      'Sarah': '6666',
      'Claire':'040',
      'Fabien': '0957',
      'Maxime': '2512'
    }

    var name = this.id.substr().substring(0, this.id.substr().length - 7);
    var codeTry = $("#" + name + "Code1").text() + $("#" + name + "Code2").text() + $("#" + name + "Code3").text() + $("#" + name + "Code4").text();
    var goodJob=false;

if (codeTry == codes[name]){
      $("#" + name + "TryCode").attr("src", "style/ok.jpg");
      $("#" + name + "TryCode").removeClass("tryCode");
    }
    else{
      $("#" + name + "Code1").css("background-color", "#fe8c95");
      $("#" + name + "Code2").css("background-color", "#fe8c95");
      $("#" + name + "Code3").css("background-color", "#fe8c95");
      $("#" + name + "Code4").css("background-color", "#fe8c95");
    }
  });

});

