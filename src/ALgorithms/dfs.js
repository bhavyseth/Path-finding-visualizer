export function dfs(grid,startnode,finishnode){
    const visitednodes=[];
    const que=[];
    que.push(startnode);
    while(que.length>0){
        console.log("que length "+que.length);
        //const node=que.shift();
        let i=que.length-1;
        ////using these while loop i am making sure that i will get the last node that has not been in the stack
        ////i used these hacky method because implementing another class named stack and then creating its object here
        ///is tedius for me because i want only pop method which i am able to do these here using while loop
        while(que[i].isinstack){
            i--;
        }
        if(i==-1)
        return visitednodes;
        const node=que[i];
        node.isinstack=true;
        if(node.iswall)
        continue;
        visitednodes.push(node);
        console.log(node);
        if(node.isvisited)
        continue;
        node.isvisited=true;
   const neighbours=getNeighbours(grid,node);
    for(const neighbournode of neighbours){
        console.log("hello");
        neighbournode.prevnode=node;
        if(neighbournode.row===finishnode.row&&neighbournode.col===finishnode.col)
        return visitednodes;
        else{
           
            que.push(neighbournode);
        }
    }
}
        return visitednodes;
}
////these is the recursive algo of dfs just for reference
/*public static void dfs(int u, ArrayList<Integer> list[], boolean  vis[]){
    for(int i:list[u]){
        if(!vis[i]){
            vis[i]=true;
            dfs(i,list,vis);
        }
    }
}*/
//////not considering the diagonal paths or nodes
////////code for diagonal nodes is written in dijkstra.js getNeighbours functon for reference
function getNeighbours(grid,node){
    const neighbours=[];
    const row=node.row;
    const col=node.col;
    if(node.row>0){
        if(!grid[row-1][col].isvisited){
        neighbours.push(grid[row-1][node.col]);
        console.log(node.row);
        }
    }
    if(node.row<grid.length-1){
        if(!grid[row+1][col].isvisited){
        neighbours.push(grid[row+1][col]);
        console.log(node.row);
        }
    }
    if(col>0){
        console.log(node)
        if(!grid[row][col-1].isvisited){
        neighbours.push(grid[row][col-1]);
        console.log(node.row);
    }
    }
    if(col<grid[0].length-1){
        if(!grid[row][col+1].isvisited){
            neighbours.push(grid[row][col+1]);
            console.log(node.row);
        }
    }
    return neighbours;
}
