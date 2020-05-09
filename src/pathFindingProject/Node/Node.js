import React ,{Component}from 'react';
import './Node.css'
class Node extends Component{
   
    render(){
        const {isfinish,isstart,iswall,onMouseDown,onMouseEnter,onMouseUp,tempstart,tempfinish,row,col,ispath,animatevisited,isinstack}=this.props;
       // const extraclassname=isfinish?'finishnode':isstart?'startnode':'';
       var extraclassname='';
      
       if(iswall){
           extraclassname='wall';
       }
       
       if(animatevisited){
           extraclassname='visited-node';
       }
      
       if(ispath){
        extraclassname='path-node';
    }
    //i added tempstart and tempfinish to add color to nodes when we move start and finish node
    //but these nodes are not final start and finish 
    //they just add colors so we can visualize their movements
    else if(isstart||tempstart){
        extraclassname='startnode';
    }
    if(isfinish||tempfinish)
    extraclassname='finishnode';
    if(tempstart)
    extraclassname='startnode';

   
        return(
            <div
            id={`node-${row}-${col}`} 
            className={`node ${extraclassname}`}
            ///on mousedown we are calling the function onMouseDown(row,col) of pathindingproject.js thats why 
            //i have used them as a props
            onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row,col)} ></div>
        )
    }
    
}
export default Node;