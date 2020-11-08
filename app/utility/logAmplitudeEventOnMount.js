import React, { useEffect } from "react";
import * as Amplitude from 'expo-analytics-amplitude';

const useMountEffect = (fun) => useEffect(fun, [])

export default function logAmplitudeEventOnMount(eventName) {
    useMountEffect(() => {Amplitude.logEvent(eventName)})}