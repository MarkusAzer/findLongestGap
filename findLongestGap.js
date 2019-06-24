const findLongestGap = (roadLength, start, end) => {
    //Array Of road Length
    const roadLengthArray = Array(roadLength).fill(null).map((_, index) => index + 1);

    //Array of Route Arrays
    const carsRoute = start.reduce((acc, el, index) => {
        acc[index] = ({ "start": el, "end": acc[index] });
        return acc;
    }, end);

    //Array of uncovered Units of the Road
    const uncoveredUnits = carsRoute.reduce((acc, el) => acc.filter((ac) => !((ac >= el.start) && (ac <= el.end))), roadLengthArray);

    //Group the related roads
    const groupUncoveredUnits = uncoveredUnits.reduce((acc, el, index) => {

        //Init lastEl
        if (index === 0) {
            acc.arrays.push([el]);
        }

        if (acc.lastEl && ((acc.lastEl + 1) === el)) {
            acc.arrays[acc.arrays.length - 1].push(el);
        } else if (index !== 0) {
            acc.arrays[acc.arrays.length] = [el];
        }

        acc.lastEl = el;
        return acc;
    }, { "arrays": [], "lastEl": null });

    //Convert sub Arrays to numbers
    const allGaps = groupUncoveredUnits.arrays.map((el) => el.length);

    //Find the longest Gap
    const longestGap = Math.max(...allGaps);

    console.log(roadLengthArray, carsRoute, uncoveredUnits, groupUncoveredUnits, allGaps, longestGap);

    return longestGap;
}

//Test the Function
const roadLength = 10;
const start = [1, 2, 5, 9];
const end = [1, 3, 6, 9];

findLongestGap(roadLength, start, end);

