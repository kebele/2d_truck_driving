// mobilde mi değil mi?
// bunun sayesinde tuş yapabiliriz veya ekrana dokunmayı açma kaatma vs. yapabiliriz.

let mobilmi = false;
(function (a) {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    mobilmi = true;
})(navigator.userAgent || navigator.vendor || window.opera);

// document.getElementById("sonuc").innerHTML = mobilmi;
console.log("mobilde miyiz? = ", mobilmi);

// setup
//canvas oluşturalım
var c = document.createElement("canvas");
//pencereye göre en, boy
c.width = window.innerWidth;
c.height = window.innerHeight;
//canvası body'e ekle
document.body.appendChild(c);
// iki boyutlu bir şeyler çizebilmek için
var ctx = c.getContext("2d");

var pts = [];
while (pts.length < 254) {
  //   pts.push(Math.floor(Math.random() * 255));
  //rastgele değerler var ancak bazı değerler hiç yok bazıları birden çok, bunu düzenlemeliyiz
  //her değerden bir tane olsun ve her değer olsun, indisleri karışık oldu, kartları kardık gibi yani
  while (pts.includes((val = Math.floor(Math.random() * 255))));
  pts.push(val);
}
// bir problem noktası olarak eğer bizim arrayde a ve b noktası aynı olursa zemin bozulur bunu engellememiz lazım,
pts.push(pts[0]);

// console.table(pts);
// keskin hatların gitmesi için lerp func hazırlaylım, lerp(a,b,t) a dan b ye t adım sayısında git demek
// var lerp = (a, b, t) => a + (b - a) * (1 - t);
var lerp = (a, b, t) => a + ((b - a) * (1 - Math.cos(t * Math.PI))) / 2;
// burada a pts[x] olan değer başlangıç değeri bunu math.floor() ile aşağı yuarlayalım

//bu pts deki rakamar y koordinatı olarak kullanacağız, bunlar 255 tane bizim ekranın eni ise daha büyük bu yüzden yatmayacak, bunun için bir noise (daraltma) yapalım, yani bizim x değerini alacak 1/10 unu alıp pts de karşılık gelen indisin değerini alacak, şimdi aşağıda ayat çizgi için kullandığımız 200 rastgele değerini artık kullanmayıp noise u kullanalım aşağıya bak
var noise = (x) => {
  //   x = x * 0.1;
  //x = x * 0.01; // daha az çizgi olsun ve sıçrama yapmasın
  x = (x * 0.01) % 254; // daha az çizgi olsun
  //   return pts[x];
  //   return pts[Math.floor(x)]; bu a olsun
  //   return pts[Math.ceil(x)]; bu da b olsun
  // lerp i dahil edelim
  return lerp(pts[Math.floor(x)], pts[Math.ceil(x)], x - Math.floor(x));
  //bununla üçgen formlu oldu, şimdi bunuda eğimli hale getirelim, dağ tepe gibi, bunuda lerp de cos ve pi hesaba dahil edip yapalım,
};

//renkler
var bgcolor = "#2A0944"; // dark
var forecolor = "#A12568"; // vişne
var linecolor = "#3B185F"; // mor
var turuncu = "#FEC260"; // turuncu
var linewidth = 5;
// var offset = 10;
var offset = -10;
// y ratio yapalım ve bunu zemin için for döngüsünde kullanalım
var yRatio = 0.3;
// zemini hareket ettirelim
var t = 0; // adım yada zaman demek
// artık t yi speed ile birlikte kullanacağız
var speed = 0;
var playing = true; // false da oyun bitsin
var k = { ArrowUp: 0, ArrowLeft: 0, ArrowRight: 0 }; // klavye tuşları

//arabayı yapalım
var player = new (function () {
  this.x = c.width / 2; // enine orta
  this.y = 50;
  this.truck = new Image();
  this.truck.src = "t.png";
  //   this.rot = 0.3;
  this.rot = 0.3;
  this.ySpeed = 0; // yer çekimi
  this.rSpeed = 0; // dönme hızı, havadayken bazen dengelenebilsin bazende ters düşsün için

  //INTERFACE
  // tuşlar
  // start butonu
  this.startBtn = new Image();
  this.startBtn.src = "basla.png";
  //sol
  this.leftBtn = new Image();
  this.leftBtn.src = "left.png";
  //sag
  this.rightBtn = new Image();
  this.rightBtn.src = "right.png";
  //hız
  this.fireBtn = new Image();
  this.fireBtn.src = "speed.png";

  //interface i çizelim
  this.drawInterface = function () {
    if (playing) {
      if (mobilmi) {
        ctx.drawImage(this.leftBtn, 20, c.height - 90, 70, 70);
        ctx.drawImage(this.rightBtn, 110, c.height - 90, 70, 70);
        ctx.drawImage(this.fireBtn, c.width - 90, c.height - 90, 70, 70);
      }
    } else {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "32px Impact";
      ctx.fillStyle = "white";
      ctx.fillText("oyun bitti", c.width / 2, c.height / 3);
      //start butonunu koyalım
      ctx.drawImage(this.startBtn, c.width / 2 - 25, c.height / 3 + 50, 50, 50);
    }
  };

  // truck ın zemine göre önmesi için rotation
  this.draw = function () {
    //truck ile zemini ayarlayalım
    var p1 = c.height * 0.9 - noise(this.x + t) * yRatio;
    var p2 = c.height * 0.9 - noise(this.x + t + 5) * yRatio; // ikinci nokta iki nokta arasındaki açı lazım old için

    //yer çekimi
    var gnd = 0; // ground
    var offset = 38;
    if (p1 - offset > this.y) {
      // havadaysak
      //   this.ySpeed += 0.1;
      this.ySpeed += 0.1;
    } else {
      // yerdeysek
      this.ySpeed -= this.y - (p1 - offset);
      this.y = p1 - offset;
      gnd = 1;
    }

    //arabanın ters düşmesi, devrilmesinde oyun bitsin
    if (!playing || (gnd && Math.abs(this.rot) > Math.PI * 0.5)) {
      // oyun false ise veya yerde ve ters ise
      playing = false;
      this.rSpeed = 5; // taklalar ata ata gitsin ekrnın dışına
      k.ArrowUp = 1;
      this.x -= speed * 5; // araba ekraın dışına doğru gitsin
      //   ctx.textAlign = "center";
      //   ctx.textBaseline = "middle";
      //   ctx.font = "32px Impact";
      //   ctx.fillStyle = "white";
      //   ctx.fillText("oyun bitti", c.width / 2, c.height / 3);
      //   //start butonunu koyalım
      //   ctx.drawImage(this.startBtn, c.width / 2 - 25, c.height / 3 + 50, 50, 50);
    }
    // this.y = p1 - 40;
    //telerleklerde zemine göre dönsün
    var angle = Math.atan2(p2 - offset - this.y, this.x + 5 - this.x);
    // havadayken burnunun üstüne dikilmesin
    if (gnd && playing) {
      //   this.rot -= (this.rot - angle) * 0.5;
      this.rot -= (this.rot - angle) * 0.5;
      this.rSpeed = this.rSpeed - (angle - this.rot);
    }

    // truck tam ortaya gelsin bazı düzenlemeler yapacağız
    // ctx.drawImage(this.truck, this.x, this.y, 80, 80);

    // this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
    this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
    this.rot -= this.rSpeed * 0.5;

    // havadaki ters dönme vb durumları,
    this.rot -= this.rSpeed * 0.1;
    //havadayken araba burnun üstüne dükülmek istemesin
    if (this.rot > Math.PI) this.rot = -Math.PI;
    if (this.rot < -Math.PI) this.rot = Math.PI;

    this.y += this.ySpeed; // yer çekimi için
    // canvası çizdiriyoruz

    // truck draw
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.drawImage(this.truck, -40, -40, 80, 80);
    ctx.restore();
    // bunu ana draw da yerine koyalım
    // şimdi truck ile zemini birleştirelim, truck ın zeminin onumunu bilmesi lazım, onu alıp buraya getirip i değerini de modifiye edelim
  };
})();

// DRAW bütün ctx li olan yani çizdiğimiz alanı draw func un içine alalım
function draw() {
  // bize 0 dan başlayan büyüyen ama hiç 1 olamayana bir sayı lazım
  //   speed -= (speed - 1) * 0.01; hızı tuşa bağlayalım aşağıda
  speed -= (speed - k.ArrowUp) * 0.01;
  //   console.log(speed);

  //   t++; t zemin giderek hızlansın, bunu mesela kullanıcı gaza basıyorsa hızlanacak frene ise yavaşlayacak gibi
  t += 10 * speed;

  // canvası bir dolduralım, default renk siyahtır, kendimiz verirsek önce style, sonra konum
  //0,0 noktasından başlayıp, pencerenin eni/boyu kadar siyahla dolduracak
  ctx.fillStyle = turuncu;
  ctx.fillRect(0, 0, c.width, c.height);

  //çizgi çizmek
  //önce nereden başlayacak, sonra
  // ctx.moveTo(100, 100);
  // ctx.lineTo(200, 200);

  //truck ı çizelim
  player.draw();

  // zemini çizelim
  ctx.fillStyle = forecolor;
  ctx.strokeStyle = linecolor;
  ctx.lineWidth = linewidth;
  ctx.beginPath();
  ctx.moveTo(offset, c.height - offset); // alt soldan başla
  // buna artık ihtiyaç yokctx.lineTo(offset, 200); // yukarıya (y ekseninde) 200 boyunda)

  //ctx.lineTo(c.width - offset, 200);
  //200 yuksekliğinde c-width boyunda yatay yani, ENINE CIZGI
  // enine engebeli çizgiler yapalım, bunun için bir array yapıp bunu rastgele değerler atayacağız
  for (let i = offset; i < c.width - offset; ++i) {
    //   ctx.lineTo(i, Math.random() * 200);
    //   ctx.lineTo(i, Math.random() * 200);
    // ctx.lineTo(i, noise(i + t)); dikeyde de iniç çıkışı frekans azaltalım
    // ctx.lineTo(i, noise(i + t) * 0.5); ekranın üstüne çok yakın alta alalım ama canvasın %90 yüksekliğinden olsun tam dibede değmesin
    // ctx.lineTo(i, c.height * 0.9 - noise(i + t) * 0.4);
    ctx.lineTo(i, c.height * 0.9 - noise(i + t) * yRatio);
  }

  ctx.lineTo(c.width - offset, c.height - offset); // sagdan aşagıya
  ctx.closePath();
  // beginPath() ve closePath ile açık alanları kapatsın
  ctx.fill();
  ctx.stroke(); // çizgiyi kalınlaştır

  //truck ı çizelim
  //   player.draw(); böyle yer çizgisinin önünde duruyor arkada durması için ground dan önce çizdirelim

  //interface i çizdirelim, butonları
  player.drawInterface();
  // draw func tekrar çağıralım

  console.log(k); // tuşların değerlerini alalım, yön tularının 3 ünü k object i içine tanımladık, aşağıda da key down up ile bunları değerlerini değiştirdik, şu anda bu değerleri alabiliryoruz ancak kullamıyoruz

  requestAnimationFrame(draw);
}

draw();

// touch kontroller yazalım
// mobildeyken çalışacak
if (mobilmi) {
  c.addEventListener("touchstart", handleStart, false);
  c.addEventListener("touchend", handleEnd, false);

  function handleStart(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    //   console.log(touches);
    for (let i = 0; i < touches.length; i++) {
      var touch = touches[i];
      // console.log(touch.pageX + ":" + touch.pageY);
      chechBtnPress(touch.pageX, touch.pageY);
    }
  }
  function handleEnd(evt) {
    evt.preventDefault();
    var touches = evt.changedTouches;
    //   console.log(touches);
    for (let i = 0; i < touches.length; i++) {
      var touch = touches[i];
      // console.log(touch.pageX + ":" + touch.pageY);
      // window.location.reload();
      chechBtnRelease(touch.pageX, touch.pageY);
    }
  }
} else {
  // desktop controller

  onkeydown = (d) => (k[d.key] = 1);
  onkeyup = (d) => (k[d.key] = 0);

  c.addEventListener("click", handleClick, false);
  function handleClick(evt) {
    evt.preventDefault();
    //   console.log(evt.clientX + ":" + evt.clientY);
    chechBtnPress(evt.clientX, evt.clientY);
    chechBtnRelease(evt.clientX, evt.clientY);
  }
}

window.onresize = function () {
  window.location.reload();
};

function chechBtnPress(x, y) {
  // sol buton
  if (playing && x > 20 && x < 90 && y > c.height - 90 && y < c.height - 20) {
    console.log("sol buton");
    k.ArrowLeft = 1;
  }
  // sağ buton
  if (playing && x > 110 && x < 180 && y > c.height - 90 && y < c.height - 20) {
    console.log("sağ buton");
    k.ArrowRight = 1;
  }
  // fire buton
  if (
    playing &&
    x > c.width - 90 &&
    x < c.width - 20 &&
    y > c.height - 90 &&
    y < c.height - 20
  ) {
    console.log("fire buton");
    k.ArrowUp = 1;
  }
}
function chechBtnRelease(x, y) {
  //start olan noktaya dokunması
  if (
    !playing &&
    x > c.width / 2 - 25 &&
    x < c.width / 2 + 25 &&
    y > c.height / 3 + 50 &&
    y < c.height / 3 + 100
  ) {
    // start butonunun konumunu tarifledik
    //   console.log("restart tıklandı");
    window.location.reload();
  }
  // sol buton
  if (playing && x > 20 && x < 90 && y > c.height - 90 && y < c.height - 20) {
    console.log("sol buton");
    k.ArrowLeft = 0;
  }
  // sağ buton
  if (playing && x > 110 && x < 180 && y > c.height - 90 && y < c.height - 20) {
    console.log("sağ buton");
    k.ArrowRight = 0;
  }
  // fire buton
  if (
    playing &&
    x > c.width - 90 &&
    x < c.width - 20 &&
    y > c.height - 90 &&
    y < c.height - 20
  ) {
    console.log("fire buton");
    k.ArrowUp = 0;
  }
}
