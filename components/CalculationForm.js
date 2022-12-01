import React, {useRef, useState} from "react";
import {Button, SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import "./calculator"
import 'react-native-get-random-values'
import {nanoid} from "nanoid";
import {CalculateAB, CalculateF, CalculateSecondArray} from "./calculator";
import {Chart, HorizontalAxis, VerticalAxis} from "react-native-responsive-linechart";
import {Line} from "react-native-svg";

async function CalculationForm() {
    const [F, setF] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [newArray, setNewArray] = useState([]);
    const [data, setData] = useState([]);
    const [line1, setLine1] = useState([]);
    const [line2, setLine2] = useState([]);
    const ref = useRef();
    setData([{idx: nanoid(), x: 0, y: 0}]);

    function getOriginalDataLine() {
        let newData = [];
        for (const datapoint of data) {
            newData.push({x: datapoint.x, y: datapoint.y});
        }
        newData.sort((firstItem, secondItem) => firstItem.x - secondItem.x);
        console.log("original array:", data);
        return newData;
    }

    function getComputedDataLine() {
        let data = [];
        for (let i = 0; i < newArray.length; i++) {
            data.push({x: data[i].x, y: newArray[i]});
        }
        data.sort((firstItem, secondItem) => firstItem.x - secondItem.x);
        console.log("computed array:", data);
        return data;
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const arrX = [], arrY = [];
        for (const datapoint of data) {
            arrX.push(datapoint.x);
            arrY.push(datapoint.y);
        }
        console.log("array x: ", arrX, "array y:", arrY);
        const AB = CalculateAB(arrX, arrY);
        await setA(AB.a);
        await setB(AB.b);
        console.log("vars:", a, b);
        await setNewArray(CalculateSecondArray(arrX, a, b));
        console.log("y1:", newArray);
        await setF(CalculateF(arrY, newArray));
        console.log("F:", F);
        await setLine1(getOriginalDataLine());
        console.log(line1);
        await setLine2(getComputedDataLine());
        console.log(line2);
        await ref?.current?.setViewportOrigin({x: 0, y: 0})
    }

    function handleRemoveDatapoint(idx) {
        setData(data.filter((s) => idx !== s.idx));
    }

    function handleDatapointXChange(e, idx) {
        console.log("Invoked datapoint x change, new value", e.nativeEvent.text);
        const newData = data.map((datapoint) => {
            if (idx !== datapoint.idx) return datapoint;
            return {...datapoint, x: parseFloat(e.nativeEvent.text)};
        });

        setData(newData);
    }

    function handleDatapointYChange(e, idx) {
        console.log("Invoked datapoint y change, new value", e.nativeEvent.text);
        const newData = data.map((datapoint) => {
            if (idx !== datapoint.idx) return datapoint;
            return {...datapoint, y: parseFloat(e.nativeEvent.text)};
        });

        setData(newData);
    }

    function handleAddDatapoint() {
        setData(data.concat([{idx: nanoid(), x: 0, y: 0}]));
    }

    return (
        <SafeAreaView
            style={{flex: 1, width: '90%', marginTop: 20}}>
            <ScrollView
                style={{width: '100%'}}>
                <Text>Data points</Text>
                <View>
                    {data.map((datapoint) => (
                        <View style={{flexDirection: "row"}} key={datapoint.idx}>
                            <TextInput
                                style={{flex: 1, width: '40%'}}
                                type="number"
                                keyboardType="phone-pad"
                                placeholder={`x`}
                                value={datapoint.x.toString()}
                                onChange={(event) => handleDatapointXChange(event, datapoint.idx)}
                            />
                            <TextInput
                                style={{flex: 2, width: '40%'}}
                                type="number"
                                keyboardType="phone-pad"
                                placeholder={`y`}
                                value={datapoint.y.toString()}
                                onChange={(event) => handleDatapointYChange(event, datapoint.idx)}
                            />
                            <Button
                                style={{flex: 3, width: '20%'}}
                                title={"-"}
                                type="button"
                                onPress={(event) => handleRemoveDatapoint(datapoint.idx)}
                                className="small"
                            />
                        </View>
                    ))}
                </View>

                <Button
                    title={"Add Datapoint"}
                    type="button"
                    onPress={handleAddDatapoint}
                    className="small"
                />

                <Button
                    title={"Count"}
                    type={"submit"}
                    onPress={await handleSubmit}
                />
                <Text>a: {a}, b: {b}</Text>
                <Text>F: {F}</Text>

                <Chart
                    style={{height: 500, width: '100%'}}
                    padding={{left: 25, top: 10, bottom: 20, right: 10}}
                    ref={ref}
                >

                    <VerticalAxis tickCount={10}/>
                    <HorizontalAxis tickCount={5}/>
                    <Line data={line1} smoothing="cubic-spline"
                          theme={{stroke: {color: 'red', width: 1}}}/>
                    <Line data={line2} smoothing="cubic-spline"
                          theme={{stroke: {color: 'blue', width: 1}}}/>
                </Chart>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CalculationForm;
