import React from "react";
import {nanoid} from "nanoid";
export interface point {
    x: number;
    y: number;
}

export interface datapoint extends point {
    idx: string;
}

export type inputDataArray = datapoint[];
export type dataArray = point[];
