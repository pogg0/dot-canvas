/*
도안 오퍼시티 
캔버스 오퍼시티
테두리 투명
스크린샷

loadCanvas(id)              도안 캔버스 로드
copyToClipboard(elementId)  복사
canvasSave()                캔버스 세이브 
changeColor(obj)            팔래트 색 바꾸기
rgbToHex(rgbType)           색 유형 바꾸기
CreateCanvas()              캔버스 만들기
 imgload()                  이미지 불러오기

document.getElementById("parllteColor").onchange = function () { //팔래트 최근 쓴 색 저장
*/

// mulimg()                    도안 삭제
// addimg()                    도안 생성

//도안 오퍼시티 | css와 range를 이어줌
$('#image-opacity').on("change mousemove", function () {
    $('#slider-value').html($(this).val());
    $('.backgroundCanvas').css({
        'opacity': $(this).val()
    });
});

//캔버스 오퍼시티 | range와 css를 이어줌
$('#canvas-opacity').on("change mousemove", function () {
    $('#slider-value').html($(this).val());
    $('.canvas').css({
        'opacity': $(this).val()
    });
});

//테두리 투명/불투명 체크박스
$('#borderCheckbox').on("change", function () {
    if ($("input:checkbox[name=borderCheckbox]").is(":checked") == true) {
        $('.backgroundCanvas table tr td').css({
            'border': "1px solid rgb(0, 0, 0)"
        });
        $('#canvas table td').css({
            'border': "1px solid rgb(0, 0, 0)"
        });
    } else {
        $('.backgroundCanvas table tr td').css({
            'border': "0px solid rgb(0, 0, 0)"
        });
        $('#canvas table td').css({
            'border': "0px solid rgb(0, 0, 0)"
        });
    }
})

$("#btnScreenShot").on("click", function () {//스크린샷

    html2canvas(document.querySelector("#canvas table")).then(function (canvas) {

        if (canvas.msToBlob) { //for IE 10, 11

            var blob = canvas.msToBlob();

            window.navigator.msSaveBlob(blob, "dot.png");

        } else {

            saveAs(canvas.toDataURL(), "dot.png");

        }



    });

    function saveAs(uri, filename) {



        var link = document.createElement('a');



        if (typeof link.download === 'string') {


            link.href = uri;

            link.download = filename;


            //Firefox requires the link to be in the body

            document.body.appendChild(link);

            //simulate click

            link.click();

            //remove the link when done

            document.body.removeChild(link);

        } else {

            window.open(uri);

        }

    }

});

$("#btnScreenShotB").on("click", function () {//스크린샷

    html2canvas(document.querySelector("body")).then(function (canvas) {

        if (canvas.msToBlob) { //for IE 10, 11

            var blob = canvas.msToBlob();

            window.navigator.msSaveBlob(blob, "dot.png");

        } else {

            saveAs(canvas.toDataURL(), "dot.png");

        }



    });

    function saveAs(uri, filename) {



        var link = document.createElement('a');



        if (typeof link.download === 'string') {


            link.href = uri;

            link.download = filename;


            //Firefox requires the link to be in the body

            document.body.appendChild(link);

            //simulate click

            link.click();

            //remove the link when done

            document.body.removeChild(link);

        } else {

            window.open(uri);

        }

    }

});

//캔버스 불러오기
function CanvasLoadCanvas(file) {
    var canvas = document.getElementById("canvas");
    var background = document.createElement("div");

    var reader = new FileReader();

    reader.onload = function () {

        canvas.innerHTML = reader.result;

        document.getElementById("wsize").value = canvas.childNodes[0].childNodes[0].childNodes[0].childNodes.length;
        document.getElementById("hsize").value = canvas.childNodes[0].childNodes[0].childNodes.length;
        for(var i =0;i<canvas.childNodes[0].childNodes[0].childNodes.length;i++){
            for(var j=0;j<canvas.childNodes[0].childNodes[0].childNodes[0].childNodes.length;j++){
                var td = canvas.childNodes[0].childNodes[0].childNodes[i].childNodes[j];
                AddEvent(td);
            }
        }
    };
    reader.readAsText(file, /* optional */ "euc-kr");


}
//도안 캔버스 로드
function backgroundCanvasLoadCanvas(file) {
    var backgroundCanvas = document.getElementsByClassName("backgroundCanvas");
    var canvas = document.getElementById("canvas");
    var background = document.createElement("div");

    backgroundCanvas[0].innerHTML = "";
    background.setAttribute('id', "background");
    background.style.zIndex = -1;

    var reader = new FileReader();

    reader.onload = function () {
        background.innerHTML = reader.result;

        document.getElementById("wsize").value = background.childNodes[0].childNodes[0].childNodes[0].childNodes.length;
        document.getElementById("hsize").value = background.childNodes[0].childNodes[0].childNodes.length;

        CreateCanvas();
        for(var i =0;i<background.childNodes[0].childNodes[0].childNodes.length;i++){
            for(var j=0;j<background.childNodes[0].childNodes[0].childNodes[0].childNodes.length;j++){
                var td = background.childNodes[0].childNodes[0].childNodes[i].childNodes[j];
                td.style.width  = canvas.childNodes[0].childNodes[0].childNodes[0].style.width;
                td.style.height = canvas.childNodes[0].childNodes[0].childNodes[0].style.height;
            }
        }
        backgroundCanvas[0].appendChild(background);
    };
    reader.readAsText(file, /* optional */ "euc-kr");
}

//캔버스 파일 열기
function backgroundCanvasOpenTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        backgroundCanvasLoadCanvas(event.target.files[0]);
    };
    input.click();
}
//캔버스 파일 열기
function CanvasOpenTextFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (event) {
        CanvasLoadCanvas(event.target.files[0]);
    };
    input.click();
}

//다운로드
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
//캔버스 세이브
function canvasSave() {
    var t = prompt("저장할 이름을 입력해 주세요.");
    if(pvalue!=null){
        return;
    }
    //copyToClipboard("canvas");
    download(t, document.getElementById("canvas").innerHTML);
    
}

function changeColor(obj) { // 팔래트 색 바꾸기
    var parllteColor = document.getElementById("parllteColor");
    parllteColor.value = rgbToHex(obj.style.backgroundColor);
}

function rgbToHex(rgbType) {

    // 컬러값과 쉼표만 남기고 삭제. 
    var rgb = rgbType.replace(/[^%,.\d]/g, "");

    // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
    rgb = rgb.split(",");

    // 컬러값이 "%"일 경우, 변환하기. 
    for (var x = 0; x < 3; x++) {
        if (rgb[x].indexOf("%") > -1) rgb[x] = Math.round(parseFloat(rgb[x]) * 2.55);
    }

    // 16진수 문자로 변환. 
    var toHex = function (string) {
        string = parseInt(string, 10).toString(16);
        string = (string.length === 1) ? "0" + string : string;

        return string;
    };

    var r = toHex(rgb[0]);
    var g = toHex(rgb[1]);
    var b = toHex(rgb[2]);

    var hexType = "#" + r + g + b;

    return hexType;
}

function CreateCanvas() { //캔버스 만들기
    //canvas 찾기
    var canvas = document.getElementById("canvas");

    //다시만들기 확인
    var obj = document.getElementById("create");
    if (obj.innerHTML === '<div>다시 만들기</div><div></div><div>다시 만들기</div>') {
        if (confirm("기존에 있던 캔버스는 삭제됩니다. \n 다시만드시겠습니까?") == true) {
            document.getElementById("canvas").innerHTML = "";
            document.getElementsByClassName("backgroundCanvas")[0].innerHTML = "";
        }
        else {
            return;
        }
    } else {
        obj.innerHTML = '<div>다시 만들기</div><div></div><div>다시 만들기</div>';
    }


    var wsize = parseInt(document.getElementById("wsize").value);
    var hsize = parseInt(document.getElementById("hsize").value);


    //table 생성
    var table = document.createElement("table");

    //size 만큼 table 생성
    for (var i = 0; i < hsize; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        var child = table.lastChild;
        for (var j = 0; j < wsize; j++) {
            //td만들기
            var td = document.createElement("td");
            //가로 세로 길이 정하기
            var www = (canvas.offsetWidth - wsize * 2.5) / wsize;
            var hhh = (canvas.offsetHeight - hsize * 2.5) / hsize
            var ifBin_w_h = (www <= hhh) ? www : hhh;
            td.style.width = ifBin_w_h + "px";
            td.style.height = ifBin_w_h + "px";

            AddEvent(td);

            child.appendChild(td);
        }

    }

    canvas.appendChild(table);
}

function AddEvent(element){

            //마우스 올라왔을때 => 오퍼시티 =0.5
            element.onmouseover = function () {
                this.style.opacity = 0.5;
            };

            //마우스가 내려갔을때 => 오퍼시티 = 1
            element.onmouseout = function () {
                this.style.opacity = 1;
            };

            //마우스 클릭하고 움직일때 => 오퍼시티 = 1
            element.ondrag = function () {
                this.style.opacity = 1;
            }

            //클릭하고 움직이는 마우스에 다앗을때 => 컬러 가져오기 =>도트 색 바꾸기 
            //드래그 중일때 (수정필요)
            element.ondragover = function () {
                var color = document.getElementById("parllteColor").value;
                this.style.backgroundColor = color;
            };

            //클릭 => 컬러 가져오기 =>도트 색 바꾸기 
            element.onclick = function () {
                var color = document.getElementById("parllteColor").value;
                this.style.backgroundColor = color;
            }
}

function imgload() { //이미지 불러오기
    canvas.innerHTML = "";

    var table = document.createElement("table");

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var j = 0; j < 10; j++) {
            var td = document.createElement('td');
            td.setAttribute('scr', '')
        }
        child.appendChild(td);
    }

}

document.getElementById("parllteColor").onchange = function () { //팔래트 최근 쓴 색 저장

    var parllteColor = document.getElementById("parllteColor");

    var colorTable = document.getElementsByClassName('colortable');

    var colorTableNum = 15;


    for (var i = colorTableNum - 1; i > 0; i--) {
        colorTable[i].style.backgroundColor = colorTable[(i - 1)].style.backgroundColor;
    }
    colorTable[0].style.backgroundColor = parllteColor.value;
}

// // 클립보드로 복사하는 기능을 생성
// function copyToClipboard(elementId) { //복사기능

//     // 글을 쓸 수 있는 란을만든다.
//     var aux = document.createElement("input");

//     // 지정된 요소의 값을 할당 한다.
//     aux.setAttribute("value", document.getElementById(elementId).innerHTML);

//     // bdy에 추가한다.
//     document.body.appendChild(aux);

//     // 지정된 내용을 강조한다.
//     aux.select();

//     // 텍스트를 카피 하는 변수를 생성
//     document.execCommand("copy");

//     // body 로 부터 다시 반환 한다.
//     document.body.removeChild(aux);

// }



// //삭제 함수
// function mulimg() {
//     var doain = document.getElementById('doain');
//     doain.innerHTML = "";
// }

// //도안 freldset
// function addimg() {

//     const imgnum = 4;

//     var doain = document.getElementById('doain');
//     if (doain.innerHTML != "") {
//         mulimg();
//         return;
//     }
//     doain.innerHTML += '<fieldset><legend>도안</legend><ul id="dotCanvas"></ul></fieldset>'
//     var ul = document.getElementById('dotCanvas');


//     for (var i = 0; i < imgnum; i++) {
//         var li = document.createElement("li");
//         li.innerHTML = '<button><img src="../dot/dot_img/' + String(i) + '.png" alt="1" OnClick="loadCanvas(' + String(i) + ')"></button>'
//         ul.appendChild(li);

//         //     var li = document.createElement("li");
//         //     var button = document.createElement("button");
//         //     li.appendChild(button);
//         //     ul.appendChild(li);
//         //     ul.setAttribute
//     }
// }
//이게 다운로드 함수져?
// function downloadInnerHtml(elementid, htmllinereplace, filename, mimeType, extension) {
//     var elHtml = $(elementid).html();
//     if (htmllinereplace) elHtml = elHtml.replace(/\<br\>/gi, '\n');
//     var link = document.createElement('a');
//     link.setAttribute('download', filename + extension);
//     link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
//     link.click();
// }