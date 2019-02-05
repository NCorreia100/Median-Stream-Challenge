/*
The Median value in reduced time complexity

Given a stream of unordered integers, find the median of the stream. We will be asked to find the median multiple times, so the peekMedian function should have optimal time complexity.

Note: The "median" is the middle number of a sorted, odd-length set or the average of the two middle numbers in a sorted, even-length set.
Example

[1, 4, 8]
Median is 4 (middle number)

[1, 3, 7, 8]
Median is 5 (average of two middle numbers)

implement methods insert, size and peakMedian
*/



//class constructor
//
var MedianStream = function () {   
    this.arr = [];
    this.median = null;
};

//class prototype
//
MedianStream.prototype = {

    //retrieve size as length of collection
    //
    size: function(){return this.arr.length},

    //retrieve median value evaluated during insert
    //
    peekMedian: function(){return this.median},

    //insert value to collection and re-evaluate median
    //
    insert: function (val) {
        let index;
        
        //if collection is empty        
        if (this.arr.length === 0) {
            this.arr.push(val)
            this.median = val;           
                
        //if the colection has odd length the median is the mid-most index of the array        
        } else if (this.arr.length % 2 === 1) {
            let medianIndex = (this.arr.length-1)/2;                        
            insertionIndex = iterateInBothDirectionsAndReturnIndexToAppend(this.arr, val, medianIndex,  medianIndex);
           
            //check if value has to be inserted on an edge, otherwise splice it                     
            if(insertionIndex===0) this.arr.unshift(val);
            else if(insertionIndex===this.arr.length) this.arr.push(val);           
            else this.arr.splice(insertionIndex, 0, val);            

            //set a new median value for a collection length that is now  even            
            let innermostRight = this.arr[this.arr.length / 2], innerMostLeft = this.arr[this.arr.length / 2 - 1]
            this.median = (innermostRight + innerMostLeft) / 2;
            
        //if collection has even lenght so the median is the average between the 2 innermost values
        } else {            
            //get innermost indexes            
            let innermostLeftIndex = Math.floor((this.arr.length - 1) / 2), innermostRightIndex = innermostLeftIndex + 1;
            
            //get index to make insertion            
            let insertionIndex = iterateInBothDirectionsAndReturnIndexToAppend(this.arr, val, innermostLeftIndex, innermostRightIndex);
            this.arr.splice(insertionIndex, 0, val);

            //set a new median for a collection that has now an odd length                      
            this.median = this.arr[Math.floor(this.arr.length / 2)];           
        }

    }

};

//helper function that provides index to make insertion with time complexity: O:ln(x), 
//starting from the midpoint and transversion outwards
//
var iterateInBothDirectionsAndReturnIndexToAppend = function (inputArr, val, leftIterator, rightIterator) {
    let copyArr = inputArr, i = leftIterator, j = rightIterator;
    
    //check when value is higher than i or smaller than j
    while(i > -1){
        if (val >=copyArr[i] && val < copyArr[j]) return i+1;
        else if (val > copyArr[i] && val < copyArr[j]) return j;
        i--;
        j++;
    };
   
    //if input value is the smallest or largest
    //
    if (val < copyArr[0]) return 0;
    else if (val > copyArr[copyArr.length-1]) return j;

    //catch errors if necessary
    //
    throw new Error('error with number, val:', val, 'i:', i, 'j:', j, 'collection:', copyArr);
}

