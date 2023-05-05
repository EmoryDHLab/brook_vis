var lineX=0;
var speed=10;
let r, g, b;
let palette;
let voyages = [];
let non_res_voyages = [];


let use_pl = 1

function preload(){
  voyage_table = loadTable("data/p5_vis_4_res.csv","csv","header")
  non_res_voyage_table = loadTable("data/p5_vis_4_nonres.csv","csv","header")
  table = loadTable("data/colors.csv", "csv", "header");
  
  //bg = loadImage("./bg.jpeg")
}

function setup() { 



  angleMode(DEGREES);
  createCanvas(8000, 900);
  

  let voyage_id = voyage_table.getColumn("voyage_id");
  //let durations = voyage_table.getColumn("avg_duration");

  let emb = voyage_table.getColumn("total_embarked_18");
  let days_btw = voyage_table.getColumn("non_res_btw_res");

  palette = Math.floor(Math.random() * 676);
  palette = 525;
  print(palette)

  for(let r_n  = 0; r_n < non_res_voyage_table.getRowCount(); r_n++){   
    let vid = non_res_voyage_table.getString(r_n,"voyage_id")
    let avg_emb = non_res_voyage_table.getNum(r_n,"total_embarked_18")
    //let btw = non_res_voyage_table.getNum(r_n,"non_res_btw_res")
    let mr = non_res_voyage_table.getNum(r_n, "mortality_rate");
    let dur = non_res_voyage_table.getNum(r_n, "derived_duration");
    console.log(dur)
    non_res_voyages[r_n] = new non_res_voyage(vid, avg_emb, mr, palette, dur)
  }

  for(let r  = 0; r < voyage_table.getRowCount(); r++){
 
    
      let vid = voyage_table.getString(r,"voyage_id")
      let avg_emb = voyage_table.getNum(r,"total_embarked_18")
      let btw = voyage_table.getNum(r,"non_res_btw_res")
      let mr = voyage_table.getNum(r, "mortality_rate");
      voyages[r] = new voyage_year(vid, avg_emb, btw, mr, palette, r)
  }

  

  
} 

function draw() { 

  let palette = random(676);
  //let val = slider.value();
  randomSeed(123)
  background(255);
  let select = 0
  for (let i = 0; i < voyage_table.getRowCount(); i++) {
    // if(val == voyages[i].year){
    //   select = 1
    // }
    voyages[i].show(select);
    select = 0
    
           
  }
  for (let j = 0; j < non_res_voyage_table.getRowCount(); j++) {
    // if(val == voyages[i].year){
    //   select = 1
    // }
    non_res_voyages[j].show(select);
    select = 0
    
           
  }
}

class voyage_year {
  constructor(vid, avg_emb, btw, mr, palette, r) {
    this.vid = vid
    this.avg_emb = avg_emb
    //console.log(this.avg_emb)
    this.btw = btw
    this.mr = mr
    this.p = palette
    this.r = r

    this.distance_left = 22.66
    this.distance_right = 22.66

  }
 
  show(select = 0) {
    if(use_pl == 1){
      let col = floor(random(5 + 0));
      r = table.get(this.p, col * 3);
      g = table.get(this.p, col * 3 + 1);
      b = table.get(this.p, col * 3 + 2);
    }else{
      random(456)
      r = int(random(255))
      g = int(random(255))
      b = int(random(255))

    }
    
    let embs = voyage_table.getColumn("total_embarked_18");    
    let min_emb = min(embs);
    let max_emb = max(embs);
    //console.log(max_emb)
    let btws = voyage_table.getColumn("non_res_btw_res");    
    let min_btw = min(btws);
    let max_btw = max(btws);

    //let voy_height = height
    let voy_height = map(this.avg_emb, min_emb, max_emb, 0, height)
    let rat = voy_height/height
    voy_height = height
    let yStart = -voy_height / 2;
    push()
    translate(map(this.r, 0, 353, 0, width), voy_height / 2);
    //console.log(map(this.r, 0, 353, 0, width))
    //print(map(this.year, e_year, l_year, 0, width))
    strokeWeight(1);
    strokeWeight(1);

    let max_ol = 200
    let max_width = 80


    let c1 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c2 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c3 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c4 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c5 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c6 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))
    let c7 = random(-this.distance_left-map(this.btw, min_btw, max_btw, 0, max_ol), this.distance_right+map(this.btw, min_btw, max_btw, 0, max_ol))

    fill(r,g,b)
    if(select == 1){
      fill(255,255,255,255)
      // c1 += random(30)
      // c2 += random(30)
      // c3 += random(30)
      // c4 += random(30)
      // c5 += random(30)
      // c6 += random(30)
      // c7 += random(30)
    }
    beginShape();
    curveVertex(c6, yStart-300*rat);
    curveVertex(c5, yStart-300*rat);
    curveVertex(c1, yStart + (voy_height / 5) * 1);
    curveVertex(c2, yStart + (voy_height / 5) * 2);
    curveVertex(c3, yStart + (voy_height / 5) * 3);
    curveVertex(c4, yStart + (voy_height / 5) * 4);
    // curveVertex(50,voy_height / 2);
    curveVertex(c7, voy_height / 2+500*rat);
    curveVertex(c7+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), voy_height / 2+500*rat);
    //curveVertex(50+10,height / 2);
    curveVertex(c4+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart + (voy_height / 5) * 4);
    curveVertex(c3+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart + (voy_height / 5) * 3);
    curveVertex(c2+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart + (voy_height / 5) * 2);
    curveVertex(c1+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart + (voy_height / 5) * 1);
    curveVertex(c5+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart-300*rat);
    curveVertex(c6+random(map(this.avg_emb*(1-this.mr), min_emb, max_emb, 0, max_width), map(this.avg_emb, min_emb, max_emb, 0, max_width)), yStart-300*rat);
    endShape(CLOSE);
    pop()   
  }
}

class non_res_voyage{
    constructor(vid, avg_emb, mr, palette, dur) {
        // let durs = non_res_voyage_table.getColumn("derived_duration");    
        // this.min_dur = min(durs);
        // this.max_dur = max(durs);
        this.vid = vid
        this.avg_emb = avg_emb
        //console.log(this.avg_emb)
        this.mr = mr
        this.p = palette
        this.distance_left = 22.66
        this.distance_right = 22.66
        this.deg = random(360)
        this.dur = dur
      }

      show(){
        console.log(this.dur)
        let squareColor = color(100, 50, 100);
        squareColor.setAlpha(10)
        stroke(squareColor)
        //strokeWeight(map(this.dur, 86400, 10022400, 5, 10))
        strokeWeight(1)
        //console.log(map(this.dur, min_dur, max_dur, 10, 100))
        line(random(width),random(height),random(width),random(height))
      }


}