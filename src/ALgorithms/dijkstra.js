import React from 'react';
 


export function dijkstra(grid,startnode,finishnode){
    const visitedNodes=[];
    startnode.distance=0;
    const unvisitednodes=getAllNodes(grid);
    while(unvisitednodes.length>0){
        sortunvisitednodes(unvisitednodes);
       const minDistanceNode=unvisitednodes.shift()//these will return the first element in the array
       if(minDistanceNode.isvisited)
       continue;
       if(minDistanceNode.iswall)
       continue;
       if(minDistanceNode.distance===Infinity)
       return visitedNodes;
       minDistanceNode.isvisited=true;
        visitedNodes.push(minDistanceNode);
        if(minDistanceNode===finishnode){
            return visitedNodes;
        }
        const unvisitedNeighbours=getNeighbours(grid,minDistanceNode);
        for(const neighbourNode of unvisitedNeighbours){
                neighbourNode.distance=minDistanceNode.distance+1;
                neighbourNode.prevnode=minDistanceNode;
        }
    }
}
function getNeighbours(grid,node){
    const neighbours=[];
    const row=node.row;
    const col=node.col;
    if(node.row>0){
        if(!grid[row-1][col].isvisited)
        neighbours.push(grid[row-1][node.col]);
        /*
        /////only for diagonal movements
        if(col>0)
        if(!grid[row-1][col-1].isvisited){
            neighbours.push(grid[row-1][col-1]);
        }
        if(col<grid[0].length-1){
            if(!grid[row-1][col+1].isvisited){
                neighbours.push(grid[row-1][col+1])
            }
        }*/
    }
    if(node.row<grid.length-1){
        if(!grid[row+1][col].isvisited)
        neighbours.push(grid[row+1][col]);
        /*
        //////////////only for diagonal movements
        if(col>0)
        if(!grid[row+1][col-1].isvisited){
            neighbours.push(grid[row+1][col-1]);
        }
        if(col<grid[0].length-1){
            if(!grid[row+1][col+1].isvisited){
                neighbours.push(grid[row+1][col+1])
            }
        }
        */
    }
    if(col>0){
        if(!grid[row][col-1].isvisited)
        neighbours.push(grid[row][col-1]);
    }
    if(col<grid[0].length-1){
        if(!grid[row][col+1].isvisited){
            neighbours.push(grid[row][col+1]);
        }
    }
    return neighbours;
}
function sortunvisitednodes(unvisitednodes){
    unvisitednodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}
function getAllNodes(grid){
    const nodes=[];
   for(const row of grid){
       for(const col of row){
           nodes.push(col);
       }
   }
    return nodes;
}
export  function getpath(finishnode){
    const path=[];
    let currnode=finishnode;
    while(currnode!=null){
        path.unshift(currnode);
        currnode=currnode.prevnode;
    }
    return path;
}