export function CalculateAB(arrayX, arrayY) {
    let n = arrayX.length;
    let sumLnX = 0.0, sumLnX2 = 0.0, sumLnXY = 0.0, sumY = 0.0;
    for (let i = 0; i < n; i++) {
        sumLnX += Math.log(arrayX[i]);
        sumLnX2 += Math.pow(Math.log(arrayX[i]), 2);
        sumLnXY += Math.log(arrayX[i]) * arrayY[i];
        sumY += arrayY[i];
    }
    let a = (sumLnXY * n - sumLnX * sumY) / (sumLnX2 * n - sumLnX2 * sumLnX2);
    let b = (sumLnX2 * sumY - sumLnXY * sumLnX) / (sumLnX2 * n - sumLnX2 * sumLnX2);
    return {a: a, b: b}
}

export function CalculateSecondArray(arrayX, a, b){
    let n = arrayX.length;
    let newArrayY = [];
    for (let i = 0; i < n; i++) {
        newArrayY.push(a*Math.log(arrayX[i])+b);
    }
    return newArrayY;
}

export function CalculateF(arrayY, newArrayY)
{
    let n = arrayY.length;
    let F = 0;
    for (let i = 0; i < n; i++) {
        F += Math.pow(arrayY[i] - newArrayY[i], 2);
    }
    return F;
}

// function CalculateAll(arrayX, arrayY) {
//     let n = arrayX.length;
//     let sumLnX = 0, sumLnX2 = 0, sumLnXY = 0, sumY = 0;
//     for (let i = 0; i<n; i++) {
//         sumLnX += Math.log(arrayX[i]);
//         sumLnX2 += Math.pow(Math.log(arrayX[i]),2);
//         sumLnXY += Math.log(arrayX[i])*arrayY[i];
//         sumY += arrayY[i];
//     }
//     let a = (sumLnXY * n - sumLnX * sumY) / (sumLnX2 * n - sumLnX2 * sumLnX2);
//     let b = (sumLnX2 * sumY - sumLnXY * sumLnX) / (sumLnX2 * n - sumLnX2 * sumLnX2);
//     let newArrayY = [];
//     for (let i = 0; i < n; i++) {
//         newArrayY.push(a*arrayX[i]+b);
//     }
//     let F = 0;
//     for (let i = 0; i < n; i++) {
//         F += Math.pow(arrayY[i] - newArrayY[i], 2);
//     }
//     return F;
// }
