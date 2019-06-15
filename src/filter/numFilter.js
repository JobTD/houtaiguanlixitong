function numFilter(num) {
    if(isNaN(num)){
            return num 
    }else{
        if(num.length>8){
            return num.substr(0, 8) 
        }else{
            return num
        }
    }
    
    
}
export default numFilter;