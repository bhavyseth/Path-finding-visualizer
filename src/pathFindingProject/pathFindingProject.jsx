import React, { Component } from "react";
import Node from "./Node/Node";
import "./pathFindingProject.css";
import {dijkstra,getpath} from "../ALgorithms/dijkstra"
import {dfs} from "../ALgorithms/dfs"
////at first i made these 4 const but since i want to move these nodes i have made them variables
let START_NODE_ROW=10;
let START_NODE_COL=15;
let FINISH_NODE_ROW=10;
let FINISH_NODE_COL=40;
class pathFindingProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
      ///i added startpressed and finishpressed to change their locations
      startpressed:false,
      finishpressed:false,
    };
  }
  componentDidMount() {
    const nodes = [];
    for (let i = 0; i < 16; i++) {
      const children = [];
      for (let j = 0; j < 49; j++) {
        children.push(createNode(i,j));
      }
      nodes.push(children);
    }
    this.setState({ nodes:nodes });
  }
  visualizeDijkstra(){
    console.log("vd called");
      const {nodes}=this.state;
      const startnode=nodes[START_NODE_ROW][START_NODE_COL];
      const finishnode=nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitednodes=dijkstra(nodes,startnode,finishnode);
      const path=getpath(finishnode);
     this.animateDijkstra(visitednodes,path);
     
  }
  handleMouseDown(row, col) {
    console.log(this.state);
    if(row===START_NODE_ROW&&col===START_NODE_COL){
      this.setState({startpressed:true});
     // const newGrid=getNewGridWithStartingPosition()
      const {nodes}= this.state;
      const newgrid=nodes.slice();
      const node=newgrid[row][col];
      node.isstart=false;
      newgrid[row][col]=node;
      this.setState({nodes:newgrid})
      
    }
    else if(row===FINISH_NODE_ROW&&col===FINISH_NODE_COL){
      this.setState({finishpressed:true});
      const {nodes}=this.state;
      const newgrid=nodes.slice();
      const node=newgrid[row][col];
      node.isfinish=false;
      newgrid[row][col]=node;
      this.setState({nodes:newgrid});
    }
    else{
      const {startpressed,finishpressed}=this.state;
      ////i am doing these to visualize the movement of start and finish nodes
      ////but these is not working god knows why already 1 hr wasted finding these bug
      if(startpressed===true){
        console.log("startpressed");
          const {nodes}=this.state;
          const newgrid=nodes.slice();
          const node=newgrid[row][col];
          node.tempstart=true;
          newgrid[row][col]=node;
          this.setState({nodes:newgrid});
      }
      else if(finishpressed===true){
        const {nodes}=this.state;
        const newgrid=nodes.slice();
        const node=newgrid[row][col];
        node.tempfinish=true;
        newgrid[row][col]=node;
        this.setState({nodes:newgrid});
      }
      else{
    const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({nodes: newGrid, mouseIsPressed: true});
      }
    }
  }
  handleMouseUp(row,col) {
    this.setState({mouseIsPressed: false});
    const {startpressed}=this.state;
    const {finishpressed}=this.state;
    ////////when we lift up the mouse then that will be the start pos
    if(startpressed===true){
      const {nodes}=this.state;
      const newgrid=nodes.slice();
      const node=newgrid[row][col];
      node.isstart=true;
      newgrid[row][col]=node;
      START_NODE_ROW=row;
      START_NODE_COL=col;
      this.setState({nodes:newgrid,startpressed:false});
    }
    else if(finishpressed){
      const {nodes}=this.state;
      const newgrid=nodes.slice();
      const node=newgrid[row][col];
      node.isfinish=true;
      newgrid[row][col]=node;
      FINISH_NODE_ROW=row;
      FINISH_NODE_COL=col;
      this.setState({nodes:newgrid,finishpressed:false});
    }
  }
  handleMouseEnter(row, col) {
    //console.log("called");
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.nodes, row, col);
    this.setState({nodes: newGrid});
    //this.setState({mouseIsPressed:false});
  }
 
 
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      
      const node=nodesInShortestPathOrder[i];
      setInterval(() => {
        ///i am not using these method because in these every 20ms the state gets updated and 
        // and hence every time whole grid gets lodded that leads lot of lags
        //that is why i used DOM method of js to find the element by id and to give every node a unique id
        //i have given every node an id refer Node.js that consists of row and col
       // const pathgrid=this.getcoloredpath(this.state.nodes,node.row,node.col);
        //this.setState({nodes: pathgrid});
       
        document.getElementById(`node-${node.row}-${node.col}`).className= 'node path-node'
      }, 20*i);
    
    }
  }
  getcoloredpath(nodes,row,col){
    const colgird=nodes.slice();
    const node=colgird[row][col];
    const newNode = {
      ...node,
      ispath: true,
      //isvisited: false,
    };
    colgird[row][col] = newNode;
    return colgird;

}
  animateDijkstra(visitedNodesInOrder,path) {
    const {nodes}=this.state;
    for (let i = 0; i <visitedNodesInOrder.length; i++) {
      const node=visitedNodesInOrder[i];
      setTimeout(() => {
        ///the reason for not using these methods is given above
     //const visitedgrid=this.getcoloredvisitedgrid(this.state.nodes,node.row,node.col);
     //this.setState({nodes: visitedgrid});
     //i added these if condition because i dont want to color the starting and finishing node
     if(!((node.row===START_NODE_ROW&&node.col===START_NODE_COL)||node.row===FINISH_NODE_ROW&&node.col===FINISH_NODE_COL))
     document.getElementById(`node-${node.row}-${node.col}`).className =
          'node visited-node';
          
     if(i==visitedNodesInOrder.length-1){
      this.animateShortestPath(path);
    }
      }, 20*i);
   
    }
  }
  getcoloredvisitedgrid(nodes,row,col){
    const coloredvisitedgrid=nodes.slice();
    const node=coloredvisitedgrid[row][col];
    const newnode = {
      ...node,
      animatevisited: true,
    };
    coloredvisitedgrid[row][col] = newnode;
    return coloredvisitedgrid;
  }
  visualizedfs(){
     // const visitednodedfs=[];
      const {nodes,mouseIsPressed}=this.state;
      const startnode=nodes[START_NODE_ROW][START_NODE_COL];
      const finishnode=nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
     const visitednodedfs=dfs(nodes,startnode,finishnode);
     const path=getpath(finishnode);
      this.animatedfs(visitednodedfs,path);
      
  }
  animatedfs(visitednodedfs,path){
      for(let i=0;i<visitednodedfs.length;i++){
        const node=visitednodedfs[i];
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node visited-node';
          if(i==visitednodedfs.length-1){
            this.animateShortestPath(path);
          }
        }, 20*i);
      }
  }
  
  render() {
    const { nodes ,mouseIsPressed} = this.state;

    return (
        <div>
            <button className="dijbtn" onClick={()=>this.visualizeDijkstra()}>Visualize Dijkstra Algorithm!</button>
            <button className="dijbtn" onClick={()=>this.visualizedfs()}>Visualize DFS</button>
            <button className="dijbtn"onClick={()=>this.visualizeDijkstra()}>Visualize BFS</button>
      <div className="grid">
        {nodes.map((row, rowindx) => {
          return (
            <div className="colsetter" key={rowindx} id={rowindx}>
              {row.map((node, colindx) => {
                  const {row,col,isfinish,isstart,iswall,animatevisited,ispath,isinstack,tempstart,tempfinish}=node;
                return <Node
                key={colindx}
                id={colindx}
                 isfinish={isfinish}
                 isstart={isstart}
                 iswall={iswall}
                 isinstack={isinstack}
                 tempstart={tempstart}
                 tempfinish={tempfinish}
                animatevisited={animatevisited}
                 col={col}
                 row={row}
                 ispath={ispath}
                 ////it is the most difficult task for me calling the event handling
                 mouseIsPressed={mouseIsPressed}
                 onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                 onMouseEnter={(row, col) =>
                   this.handleMouseEnter(row, col)
                 }
                 onMouseUp={(row,col) => this.handleMouseUp(row,col)}
                ></Node>;
              })}
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}

const createNode=(row,col)=> {
    return{
        row,
        col,
        isinstack: false,
        isstart:row===START_NODE_ROW&&col===START_NODE_COL?true:false,
        isfinish:row===FINISH_NODE_ROW&&col===FINISH_NODE_COL?true:false,
        isvisited: false,
        animatevisited:false,
        distance: Infinity,
        tempstart:false,
        tempfinish:false,
        iswall: false,
        prevnode: null,
        ispath: false
    
    }
}
const getNewGridWithWallToggled = (grid, row, col) => {
  console.log("called fun");
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    iswall: !node.iswall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
export default pathFindingProject;
