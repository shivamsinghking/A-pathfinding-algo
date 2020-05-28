var row =50;
var col =50;
var w,h;
var openSet =[];
var closeSet =[];
var start;
var end;
var path=[];
function removeFrom(arr,ele){
  for(var i=arr.length-1;i>=0;i--){
    if(arr[i]==ele){
      arr.splice(i,1);
    }
  }
}

function heuristic(a,b){
   var d = dist(a.i,a.j,b.i,b.j);
   return d;
}

function spot(i,j){
    this.x=i,this.y=j;
  this.g=0;
  this.h =0; 
  this.f=0;
  var i = i;
  var j=  j;
  this.wall= false;
  if(random(1)<0.2){
    this.wall = true;
  }
  this.neighbour =[];
  this.previous = undefined;
  this.addneighbour = function(grid){
        if(i<col-1){
        this.neighbour.push(grid[i+1][j]);
        }
        if(i>0){
          this.neighbour.push(grid[i-1][j]);
        }
        if(j<row-1){
          this.neighbour.push(grid[i][j+1]);
        }
        if(j>0){
          this.neighbour.push(grid[i][j-1]);
        }
        // if(i>0&&j>0){
        //   this.neighbour.push(grid[i-1][j-1]);
        // }
        // if(i<col-1&&j>0){
        //   this.neighbour.push(grid[i+1][j-1]);
        // }
        // if(i>0&&j<row-1){
        //   this.neighbour.push(grid[i-1][j+1]);}
        // if(i<col-1&&j<row-1){
        //   this.neighbour.push(grid[i+1][j+1]);
        // }


  }
  this.show = function(cols){
      
      fill(cols);
      if(this.wall==true){
        fill(0);
      }
      stroke(0);
    rect(this.x*w,this.y*h,w,h);
  }
}

var grid = new Array(col);

function setup() {
  createCanvas(400, 400);
  w= 400/col;
  h = 400/row;
  for(var i=0;i<col;i++){
   grid[i] = new Array(row); 
  }
  
  for(var i=0;i<col;i++){
     for(var j=0;j<row;j++){
       grid[i][j] = new spot(i,j);
     }
  }

  for(var i=0;i<col;i++){
    for(var j=0;j<row;j++){
      grid[i][j].addneighbour(grid);
    }
 }
   start = grid[0][0];
   end = grid[row-1][col-1];

   console.log(grid);
   openSet.push(start);
  
  
}

function draw() {

    if(openSet.length>0){
   var winner =0;
   for(var i=0;i<openSet.length;i++){
     if(openSet[i].f<openSet[winner].f){
       winner =i;
     }
   }
   var current = openSet[winner];
   if(current === end){
     var temp = current;
     path.push(temp);
      while(temp.previous){
       path.push(temp.previous);
       temp = temp.previous;
      }
 
      
      console.log("done");
   }

   removeFrom(openSet,current);
   closeSet.push(current);
   var neighbours = current.neighbour;
   for(var i=0;i<neighbours.length;i++){
      var neighbour = neighbours[i];

      if(!closeSet.includes(neighbour)&& !neighbour.wall ){
        var tempG = current.g+1;

        if(openSet.includes(neighbour)){
          if(tempG<neighbour.g){
            neighbour.g = tempG; 
          }
        }else{
          neighbour.g = tempG;
          openSet.push(neighbour);

        }
        neighbour.h = heuristic(neighbour,end);
        neighbour.f = neighbour.g +neighbour.h;
        neighbour.previous = current;
      }
   }
   
    }else{
            console.log("nosolution");
            
    }
  
     start.wall = false;
     end.wall = false;
    
    background(255);
    for(var i=0;i<col;i++){
        for(var j=0;j<row;j++){
          grid[i][j].show(color(255));
        }
     }

     for(var i=0;i<closeSet.length;i++){
       closeSet[i].show(color(255,0,0));
    }
    for(var i=0;i<openSet.length;i++){
        openSet[i].show(color(0,255,0));
    }

  
    for(var i=0;i<path.length;i++){
      path[i].show(color(0,0,255));
    }
 
}