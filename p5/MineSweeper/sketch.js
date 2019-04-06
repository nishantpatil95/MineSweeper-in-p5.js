scl=30;
var w=20;
var h=20;
var Map=[];
var Monsters=[];
var n_monsters=20;
var gameover=false;
var Flag_mode=false;
var Total_Cells=0;
var Undiscovered_Cells=0;
var Discovered_Cells=0;
var Flaged_Cells=0;
var Monsters_count=0;
var text_space=30;
function setup(){
	createCanvas(w*scl, h*scl+200);

	Monsters_count=n_monsters;
	Total_Cells=w*h;
	for(var i=0;i<h;i++)
	{
		Map[i]=[];
		for(var j=0;j<w;j++)
		{
			Map[i][j]=new cell(i,j);
		}
	}
	for(var i=0;i<n_monsters;i++)
	{
		Monsters[i]=new Monster();
		Map[Monsters[i].y][Monsters[i].x]=new cell(Monsters[i].y,Monsters[i].x,Monsters[i]);

	}
	console.log(Map);
	for(var i=0;i<h;i++)
	{
		for(var j=0;j<w;j++)
		{
			if(!(Map[i][j].isMon))
			{
				//console.log(i,j);
				Map[i][j].number=getCount(i,j);
			}
		}
	}


}
function keyPressed()
{
	if(keyCode === 32)
	{
		Flag_mode=!Flag_mode;
		console.log(Flag_mode);
	}
}
function getCount(y,x)
{
	var c=0;
	for(var i=y-1;i<y+2;i++)
		for(var j=x-1;j<x+2;j++)
		{
			if(i!=-1&&j!=-1&&i!=h&&j!=w)
			{
				//console.log("getc",i,j);
				if(i!=y||j!=x)
					if(Map[i][j].isMon)
						c=c+Map[i][j].Mon.type;
			}
		}
		return c;
}


function draw(){
	background(0);
	Flaged_Cells=0;
	Discovered_Cells=0;
	Undiscovered_Cells=0;
	for(var i=0;i<h;i++)
	{
		for(var j=0;j<w;j++)
		{
			Map[i][j].show();
			if(Map[i][j].isDiscovered)
				Discovered_Cells++;
			else
				Undiscovered_Cells++;
			if(Map[i][j].flaged)
				Flaged_Cells++;
		}
	}
	if(Undiscovered_Cells==Flaged_Cells && Flaged_Cells==n_monsters)
	{
			gameover=true;
			game_win=true;
	}
	textSize(scl-4);
	noStroke();
	if(gameover)
	{
		if(game_win)
		{
			fill(0,255,0,255);
				text("Congratulations you win!",10,h*scl+text_space);
		}
		else
		text("GAME OVER!",10,h*scl+text_space);
	}
	else if(Flag_mode)
	{
		fill(0,255,0,255);
		text("Flag Mode::ON  (Press Space to disable)",10,h*scl+text_space);
	}
	else{
		fill(255,0,0,255);
		text("Flag Mode::OFF (Press Space to enable)",10,h*scl+text_space);
	}
	fill(255,255,255,255);
	text("Total_Cells\t\t\t"+Total_Cells,10,h*scl+text_space*2);
	text("Undiscovered_Cells\t\t\t"+Undiscovered_Cells,10,h*scl+text_space*3);
	text("Discovered_Cells\t\t\t"+Discovered_Cells,10,h*scl+text_space*4);
	text("Flaged_Cells\t\t\t"+Flaged_Cells,10,h*scl+text_space*5);
	text("Monsters_count\t\t\t"+Monsters_count,10,h*scl+text_space*6);

}
class cell{
	constructor(y,x,mon)
	{


		this.isDiscovered=false;
		this.number=0;
		this.x=x;
		this.y=y;
		this.isMon=false;
		this.flaged=false;
		if(mon)
		{
			this.isMon=true;
			this.Mon=mon;
		}
	}
	show()
	{
		stroke(200);

			fill(map(this.isDiscovered,0,1,200,255),150);

			rect(this.x*scl,this.y*scl,scl,scl,);
		if(this.isDiscovered)
		{
			if(this.isMon)
			{
				this.Mon.show();
			}

			else
			{

				if(this.number!=0)
				{
					noStroke();
					textSize(scl-4);
					fill(int(map(this.number,1,20,0,255)),int(map(this.number,1,20,50,0)),int(map(1/this.number*5,0,10,255,0)));
					if(this.number>9)
					text(str(this.number),this.x*scl,this.y*scl+scl-scl/6);
					else
					text(str(this.number),this.x*scl+scl/5,this.y*scl+scl-scl/6);
				}
			}
		}
		else if(this.flaged)
			{
					noStroke();
					textSize(scl-4);
					fill(255,0,0,255);
					text("F",this.x*scl+3,this.y*scl+scl-scl/6);
			}


	}
	flag_cell=function()
	{
		this.flaged=!this.flaged;
		console.log(this.flaged);
	}
}
function Discover(posy,posx)
{

		if(Map[posy][posx].isDiscovered)
			return;
		Map[posy][posx].isDiscovered=true;
		if(Map[posy][posx].number!=0)
			return;




		if(posy-1!=-1&&posy-1!=h&&posx!=-1&&posx!=w)
		Discover(posy-1,posx);
		if(posy!=-1&&posy!=h&&posx-1!=-1&&posx-1!=w)
		Discover(posy,posx-1);
		if(posy+1!=-1&&posy+1!=h&&posx!=-1&&posx!=w)
		Discover(posy+1,posx);
		if(posy!=-1&&posy!=h&&posx+1!=-1&&posx+1!=w)
		Discover(posy,posx+1);
		if(posy+1!=-1&&posy+1!=h&&posx+1!=-1&&posx+1!=w)
		Discover(posy+1,posx+1);
		if(posy-1!=-1&&posy-1!=h&&posx-1!=-1&&posx-1!=w)
		Discover(posy-1,posx-1);
		if(posy-1!=-1&&posy-1!=h&&posx+1!=-1&&posx+1!=w)
		Discover(posy-1,posx+1);
		if(posy+1!=-1&&posy+1!=h&&posx-1!=-1&&posx-1!=w)
		Discover(posy+1,posx-1);

}
function mousePressed()
{
	if(!gameover)
	{
	var posx=int(mouseX/scl);
			var posy=int(mouseY/scl);
	console.log(mouseButton );
	if(Flag_mode)
	{
		Map[posy][posx].flag_cell();
	}
	else
	{
	if(!gameover)
		if(mouseX<w*scl&&mouseY<h*scl)
		{
			if(!Map[posy][posx].flaged)
			if(Map[posy][posx].isMon)
			{
				gameover=true;
				for(var i=0;i<h;i++)
					for(var j=0;j<w;j++)
						Map[i][j].isDiscovered=true;
			}
			else
			{
				Discover(posy,posx);
			}



		}
	}
	}
}
class Monster
{
	constructor()
	{
		this.type=int(random(1,6));
		this.x=int(random(0,w));
		this.y=int(random(0,h));
	}
	show()
	{
			stroke(200);
			fill(50*this.type,0,0,150);
			rect(this.x*scl,this.y*scl,scl,scl,);
			noStroke();
			textSize(scl-4);
			fill(255);
			text(str(this.type),this.x*scl+scl/5,this.y*scl+scl-scl/6);

	}
}
